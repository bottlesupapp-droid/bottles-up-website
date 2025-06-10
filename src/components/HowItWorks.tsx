
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, CreditCard, PartyPopper, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Discover',
      description: 'Browse through our curated collection of premium events and exclusive venues in any city worldwide.',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Calendar,
      title: 'Select',
      description: 'Choose your perfect event, pick your preferred date and time, and customize your party experience.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: CreditCard,
      title: 'Secure',
      description: 'Lock in your spot with our secure payment system. Flexible options including pay-later and group splitting.',
      color: 'from-pink-500 to-orange-600'
    },
    {
      icon: PartyPopper,
      title: 'Experience',
      description: 'Arrive in style with your digital pass. Skip lines, enjoy VIP treatment, and create unforgettable memories.',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-secondary/20" />
      
      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-orange/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm">SIMPLE PROCESS</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            How It{' '}
            <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
            Getting started with Bottles Up is effortless. Follow these four simple steps to unlock your next unforgettable night out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <Card className="bg-gradient-charcoal border-border/50 hover:border-primary/50 transition-all duration-500 group-hover:glow-orange/50 animate-fade-in h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-orange/10 rounded-full blur-xl transform translate-x-6 -translate-y-6" />
                  
                  <div className="w-20 h-20 bg-gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 glow-orange relative z-10">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold shadow-lg animate-pulse-glow">
                    {index + 1}
                  </div>
                  
                  <h3 className="text-2xl font-display font-semibold mb-4 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {step.description}
                  </p>
                  
                  {/* Progress indicator */}
                  <div className="mt-6 w-full h-1 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-orange transition-all duration-1000 group-hover:w-full" 
                      style={{ width: `${((index + 1) / 4) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Connector arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 z-20">
                  <div className="w-6 h-6 bg-gradient-orange rounded-full flex items-center justify-center animate-pulse">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
