import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';
import QRCode from 'npm:qrcode@1.5.3';
import { generateTicketCode, sendTicketEmail } from '../_shared/ticketEmail.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret, undefined, cryptoProvider);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (!orderId) {
      console.error('checkout.session.completed with no order_id metadata:', session.id);
      return new Response('ok', { status: 200 });
    }

    const { data: order, error: orderError } = await supabase
      .from('site_orders')
      .select('*, ticket_tiers:site_ticket_tiers(*, events:site_events(*))')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Order not found for webhook:', orderId, orderError);
      return new Response('ok', { status: 200 });
    }

    // Idempotent: Stripe retries webhooks, and a ticket must never be generated/emailed twice.
    if (order.ticket_sent_at) {
      return new Response('ok', { status: 200 });
    }

    const ticketCode = generateTicketCode();
    const qrDataUrl = await QRCode.toDataURL(ticketCode, { width: 400, margin: 1 });

    const { error: updateError } = await supabase
      .from('site_orders')
      .update({
        status: 'paid',
        stripe_payment_intent_id:
          typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
        ticket_code: ticketCode,
        ticket_sent_at: new Date().toISOString(),
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Failed to update order after payment:', updateError);
      return new Response('ok', { status: 200 });
    }

    await supabase.rpc('increment_tier_sold', { p_tier_id: order.tier_id, p_qty: order.quantity });

    const tier = order.ticket_tiers as { name: string; events: { title: string; venue_name: string; start_date: string } };
    await sendTicketEmail({
      toEmail: order.customer_email,
      toName: order.customer_name,
      eventTitle: tier.events.title,
      venueName: tier.events.venue_name,
      startDate: tier.events.start_date,
      tierName: tier.name,
      quantity: order.quantity,
      ticketCode,
      qrDataUrl,
    });
  }

  return new Response('ok', { status: 200 });
});
