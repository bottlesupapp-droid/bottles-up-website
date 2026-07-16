import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';
import BookingDialog from './BookingDialog';

type EventRow = Database['public']['Tables']['site_events']['Row'];
type TierRow = Database['public']['Tables']['site_ticket_tiers']['Row'];
export type EventWithTiers = EventRow & { ticket_tiers: TierRow[] };

const formatPriceFrom = (tiers: TierRow[]) => {
  if (tiers.length === 0) return null;
  const min = Math.min(...tiers.map((t) => t.price_cents));
  return `$${(min / 100).toFixed(0)}`;
};

const PopularEvents = () => {
  const [events, setEvents] = useState<EventWithTiers[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingEvent, setBookingEvent] = useState<EventWithTiers | null>(null);

  useEffect(() => {
    supabase
      .from('site_events')
      .select('*, ticket_tiers:site_ticket_tiers(*)')
      .eq('status', 'published')
      .order('start_date', { ascending: true })
      .then(({ data }) => {
        setEvents((data as EventWithTiers[]) ?? []);
        setLoading(false);
      });
  }, []);

  if (!loading && events.length === 0) {
    return null;
  }

  return (
    <section id="events" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Trending{' '}
            <span className="text-gradient">Events</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't miss out on the hottest events in your city. Book now before they sell out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {events.map((event, index) => (
            <Card
              key={event.id}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={event.cover_image_url ?? '/placeholder.svg'}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {formatPriceFrom(event.ticket_tiers) && (
                  <div className="absolute bottom-3 left-3 bg-gradient-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                    From {formatPriceFrom(event.ticket_tiers)}
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.venue_name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>
                      {new Date(event.start_date).toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      •{' '}
                      {new Date(event.start_date).toLocaleTimeString(undefined, {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1 border-border">
                    <Link to={`/events/${(event as any).slug || event.id}`}>
                      <Info className="mr-1.5 h-4 w-4" />
                      Details
                    </Link>
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-orange hover:opacity-90 text-white border-0"
                    disabled={event.ticket_tiers.length === 0}
                    onClick={() => setBookingEvent(event)}
                  >
                    {event.ticket_tiers.length === 0 ? 'Coming Soon' : 'Book Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BookingDialog
        event={bookingEvent}
        open={!!bookingEvent}
        onOpenChange={(open) => !open && setBookingEvent(null)}
      />
    </section>
  );
};

export default PopularEvents;
