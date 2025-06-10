
import { Calendar, Users, Shield, Zap, CreditCard, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Event Discovery',
      description: 'Find the hottest events and parties in your area with our smart recommendation engine.'
    },
    {
      icon: Users,
      title: 'Group Bookings',
      description: 'Coordinate with friends and book tables for your entire crew with just a few taps.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your transactions are protected with bank-level security and instant confirmation.'
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Skip the queues and get instant access to VIP areas and exclusive events.'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payments',
      description: 'Pay now or later with our flexible payment options and group splitting features.'
    },
    {
      icon: MapPin,
      title: 'Location Based',
      description: 'Discover venues and events near you or in any city you plan to visit.'
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Why Choose{' '}
            <span className="text-gradient">Bottles Up</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            We've reimagined how you discover and book nightlife experiences. 
            From exclusive events to VIP tables, everything you need is at your fingertips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-orange rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
