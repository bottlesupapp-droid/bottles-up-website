
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Star } from 'lucide-react';

const PopularEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Rooftop Summer Party',
      venue: 'Sky Lounge NYC',
      date: 'Sat, Jun 15',
      time: '9:00 PM',
      price: '$45',
      attendees: 156,
      rating: 4.9,
      image: 'photo-1605810230434-7631ac76ec81'
    },
    {
      id: 2,
      title: 'Electronic Night',
      venue: 'Underground Club',
      date: 'Fri, Jun 21',
      time: '10:00 PM',
      price: '$35',
      attendees: 89,
      rating: 4.8,
      image: 'photo-1721322800607-8c38375eef04'
    },
    {
      id: 3,
      title: 'VIP Bottle Service',
      venue: 'Elite Nightclub',
      date: 'Sat, Jun 22',
      time: '11:00 PM',
      price: '$125',
      attendees: 234,
      rating: 5.0,
      image: 'photo-1500673922987-e212871fec22'
    }
  ];

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
                  src={`https://images.unsplash.com/${event.image}?w=400&h=300&fit=crop`}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-xs font-medium">{event.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-gradient-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.price}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.attendees} going</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-orange hover:opacity-90 text-white border-0">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularEvents;
