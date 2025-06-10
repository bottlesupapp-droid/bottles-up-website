
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Star, Clock, Sparkles } from 'lucide-react';

const PopularEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Rooftop Summer Gala',
      venue: 'Sky Lounge NYC',
      date: 'Sat, Jun 15',
      time: '9:00 PM',
      price: '$45',
      originalPrice: '$65',
      attendees: 156,
      rating: 4.9,
      image: 'photo-1605810230434-7631ac76ec81',
      tag: 'HOT'
    },
    {
      id: 2,
      title: 'Electronic Odyssey',
      venue: 'Underground Pulse',
      date: 'Fri, Jun 21',
      time: '10:00 PM',
      price: '$35',
      originalPrice: '$50',
      attendees: 89,
      rating: 4.8,
      image: 'photo-1721322800607-8c38375eef04',
      tag: 'VIP'
    },
    {
      id: 3,
      title: 'Elite Bottle Service',
      venue: 'Platinum Nightclub',
      date: 'Sat, Jun 22',
      time: '11:00 PM',
      price: '$125',
      originalPrice: '$180',
      attendees: 234,
      rating: 5.0,
      image: 'photo-1500673922987-e212871fec22',
      tag: 'EXCLUSIVE'
    }
  ];

  return (
    <section id="events" className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-orange/10 border border-primary/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-primary font-semibold text-sm">TRENDING NOW</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Hottest{' '}
            <span className="text-gradient">Events</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
            Don't miss out on the most exclusive events in your city. Premium experiences are selling out fast!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {events.map((event, index) => (
            <Card 
              key={event.id} 
              className="bg-gradient-charcoal border-border/50 hover:border-primary/50 transition-all duration-500 group overflow-hidden animate-fade-in hover:glow-orange/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${event.image}?w=500&h=300&fit=crop`}
                  alt={event.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Event tag */}
                <div className="absolute top-4 left-4 bg-gradient-orange text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                  {event.tag}
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-xs font-semibold">{event.rating}</span>
                </div>
                
                {/* Price */}
                <div className="absolute bottom-4 right-4 bg-gradient-orange text-white px-4 py-2 rounded-xl">
                  <div className="text-sm font-bold">{event.price}</div>
                  <div className="text-xs opacity-75 line-through">{event.originalPrice}</div>
                </div>
              </div>
              
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-semibold mb-4 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-6 text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium">{event.venue}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                    <Clock className="w-4 h-4 text-primary ml-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-orange hover:opacity-90 text-white border-0 font-semibold text-lg h-12 glow-orange hover:glow-orange-lg transition-all duration-300">
                  Book Experience
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-8 py-3 h-auto animated-border"
          >
            Discover All Events
            <Calendar className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularEvents;
