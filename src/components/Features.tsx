import { Calendar, Users, Shield, Zap, CreditCard, MapPin, Ticket, Crown, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: Crown,
      title: 'VIP Table Bookings',
      description: 'Reserve premium tables at Toronto\'s hottest clubs and lounges. Skip the line and enjoy VIP treatment all night long.'
    },
    {
      icon: Ticket,
      title: 'Digital Tickets',
      description: 'Secure digital tickets for exclusive events, concerts, and parties. QR code entry for seamless venue access.'
    },
    {
      icon: Calendar,
      title: 'Event Discovery',
      description: 'Discover curated events happening across Toronto. From rooftop parties to underground shows - find your scene.'
    },
    {
      icon: MapPin,
      title: 'Toronto Hotspots',
      description: 'Entertainment District, King Street, Queen West - we\'ve got connections to the city\'s premier nightlife destinations.'
    },
    {
      icon: Users,
      title: 'Group Coordination',
      description: 'Plan nights out with friends. Split costs, coordinate arrival times, and ensure everyone\'s on the guest list.'
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Live venue capacity, wait times, and event updates. Make informed decisions about where to go next.'
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Bank-level security for all transactions. Partner verification ensures you\'re booking with legitimate venues.'
    },
    {
      icon: Zap,
      title: 'Instant Confirmation',
      description: 'Get immediate booking confirmations and digital receipts. No more waiting or uncertainty about your reservations.'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment',
      description: 'Multiple payment options including group splitting, deposits, and pay-at-venue arrangements for maximum convenience.'
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
            Revolutionizing{' '}
            <span className="text-gradient">Toronto Nightlife</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            From Entertainment District to King Street West, BottlesUp connects you to the city's most exclusive venues and events.
            Experience Toronto nightlife like never before.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-black/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 group animate-fade-in hover-lift backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-orange rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform glow-orange">
                  <feature.icon className="w-6 h-6 text-black font-bold" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Ready to elevate your Toronto nightlife experience?</p>
          <button 
            onClick={() => {
              const waitlistSection = document.querySelector('#waitlist');
              waitlistSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-orange hover:opacity-90 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 glow-orange"
          >
            Join the Revolution
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
