import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeadersFor, handleOptions } from '../_shared/cors.ts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req: Request) => {
  const preflight = handleOptions(req);
  if (preflight) return preflight;

  const cors = corsHeadersFor(req);

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { email, firstName, lastName } = await req.json();

    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'A valid email is required' }), {
        status: 400,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { error: dbError } = await supabase
      .from('vip_emails')
      .upsert(
        { email: email.toLowerCase(), first_name: firstName ?? null, last_name: lastName ?? null },
        { onConflict: 'email', ignoreDuplicates: true },
      );

    if (dbError) {
      console.error('vip_emails insert error:', dbError);
      return new Response(JSON.stringify({ error: 'Failed to join waitlist' }), {
        status: 500,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    // Best-effort Mailchimp mirror - failures here never fail the request, since the
    // DB row (the CMS source of truth) is already saved.
    const mailchimpApiKey = Deno.env.get('MAILCHIMP_API_KEY');
    const mailchimpServerPrefix = Deno.env.get('MAILCHIMP_SERVER_PREFIX');
    const mailchimpListId = Deno.env.get('MAILCHIMP_LIST_ID');

    if (mailchimpApiKey && mailchimpServerPrefix && mailchimpListId) {
      try {
        const mcResponse = await fetch(
          `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${mailchimpApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email_address: email,
              status: 'subscribed',
              merge_fields: { FNAME: firstName ?? '', LNAME: lastName ?? '' },
            }),
          },
        );

        if (mcResponse.ok || (await mcResponse.clone().json()).title === 'Member Exists') {
          await supabase.from('vip_emails').update({ mailchimp_synced: true }).eq('email', email.toLowerCase());
        } else {
          console.error('Mailchimp sync failed:', await mcResponse.text());
        }
      } catch (mcError) {
        console.error('Mailchimp sync error:', mcError);
      }
    }

    return new Response(JSON.stringify({ success: true, message: "You're on the VIP list!" }), {
      status: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('vip-subscribe error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
});
