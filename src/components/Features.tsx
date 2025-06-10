
import { Calendar, Users, Shield, Zap, CreditCard, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Discovery',
      description: 'AI-powered recommendations find the perfect events and parties tailored to your preferences and location.'
    },
    {
      icon: Users,
      title: 'Group Coordination',
      description: 'Seamlessly coordinate with friends, split costs, and book tables for your entire crew with intelligent group features.'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your transactions are protected with enterprise-grade security, encrypted payments, and instant confirmation.'
    },
    {
      icon: Zap,
      title: 'Lightning Booking',
      description: 'Skip the queues with instant booking, real-time availability, and immediate access to VIP areas.'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payments',
      description: 'Multiple payment options, installment plans, and smart group splitting make booking effortless.'
    },
    {
      icon: MapPin,
      title: 'Global Network',
      description: 'Access premium venues worldwide with local insights and exclusive partnerships in every major city.'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-orange/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm">FEATURES</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Why Choose{' '}
            <span className="text-gradient">Bottles Up</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
            We've reimagined how you discover and book nightlife experiences. 
            From exclusive events to VIP tables, everything you need is at your fingertips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-charcoal border-border/50 hover:border-primary/50 transition-all duration-500 group animate-fade-in hover:glow-orange/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 glow-orange">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light text-lg">
                  {feature.description}
                </p>
                
                {/* Decorative element */}
                <div className="mt-6 w-12 h-0.5 bg-gradient-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
