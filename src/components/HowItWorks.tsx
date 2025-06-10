
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, CreditCard, PartyPopper } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Discover',
      description: 'Browse through curated events and venues in your area or any city you plan to visit.'
    },
    {
      icon: Calendar,
      title: 'Select',
      description: 'Choose your perfect event, pick your preferred date and time, and select your party size.'
    },
    {
      icon: CreditCard,
      title: 'Book',
      description: 'Secure your spot with our safe payment system. Pay now or choose our flexible payment options.'
    },
    {
      icon: PartyPopper,
      title: 'Enjoy',
      description: 'Show up and party! Skip the lines with your digital ticket and enjoy VIP treatment.'
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            How It{' '}
            <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting started with Bottles Up is simple. Follow these four easy steps to book your next unforgettable night out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-orange transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
