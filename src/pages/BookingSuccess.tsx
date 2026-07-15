import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle2, Loader2, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface PaidTicket {
  ticketCode: string;
  customerName: string;
  quantity: number;
  eventTitle: string;
  venueName: string;
  startDate: string;
  tierName: string;
}

const REDIRECT_SECONDS = 15;

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'checking' | 'paid' | 'pending'>('checking');
  const [ticket, setTicket] = useState<PaidTicket | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (!sessionId) return;

    let attempts = 0;
    let cancelled = false;

    const poll = async () => {
      const { data } = await supabase.functions.invoke('site-booking-status', {
        body: { session_id: sessionId },
      });

      if (cancelled) return;

      if (data?.status === 'paid' && data.ticket) {
        setTicket(data.ticket as PaidTicket);
        setStatus('paid');
        return;
      }
      attempts += 1;
      if (attempts < 10) {
        setTimeout(poll, 2000);
      } else {
        setStatus('pending');
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  useEffect(() => {
    if (status !== 'paid') return;
    if (secondsLeft <= 0) {
      navigate('/');
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [status, secondsLeft, navigate]);

  if (status === 'paid' && ticket) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 py-12 text-center">
        <CheckCircle2 className="mb-4 h-12 w-12 text-orange-500" />
        <h1 className="mb-2 text-3xl font-bold text-white">You're in! 🍾</h1>
        <p className="mb-8 text-gray-400">Your e-ticket is below - we also emailed a copy to you.</p>

        <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
          <div className="bg-gradient-orange px-6 py-4 text-left">
            <div className="text-xs font-medium uppercase tracking-wide text-black/70">BottlesUp E-Ticket</div>
            <div className="text-lg font-bold text-black">{ticket.eventTitle}</div>
          </div>

          <div className="space-y-4 p-6">
            <div className="flex justify-center rounded-xl bg-white p-4">
              <QRCodeSVG value={ticket.ticketCode} size={180} />
            </div>

            <div className="text-center text-xl font-bold tracking-[0.2em] text-white">{ticket.ticketCode}</div>

            <div className="space-y-2 border-t border-gray-800 pt-4 text-left text-sm text-gray-400">
              {ticket.venueName && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{ticket.venueName}</span>
                </div>
              )}
              {ticket.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {new Date(ticket.startDate).toLocaleString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-1">
                <span>{ticket.tierName}</span>
                <span>× {ticket.quantity}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Taking you back home in {secondsLeft}s...
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-3 border-gray-700 text-white hover:bg-gray-900"
        >
          <Link to="/">Back to BottlesUp now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <Loader2 className="mb-6 h-12 w-12 animate-spin text-orange-500" />
      <h1 className="mb-4 text-3xl font-bold text-white">Payment received</h1>
      <p className="mb-8 max-w-md text-gray-400">
        {status === 'checking'
          ? "We're confirming your payment - this usually takes a few seconds."
          : "Still confirming your payment. Your e-ticket will arrive by email shortly - check back here or your inbox."}
      </p>
      <Button asChild className="bg-gradient-orange text-black font-bold hover:opacity-90">
        <Link to="/">Back to BottlesUp</Link>
      </Button>
    </div>
  );
};

export default BookingSuccess;
