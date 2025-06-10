
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, Calendar, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">Rated 4.9/5 by 50,000+ users</span>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Book the{' '}
              <span className="text-gradient animate-gradient-shift bg-[length:200%_200%]">Perfect Night</span>{' '}
              Out
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed font-light">
              Discover exclusive events, book VIP tables, and experience the hottest venues in your city. 
              Bottles Up brings the nightlife to your fingertips with premium experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-orange hover:opacity-90 text-white border-0 group glow-orange hover:glow-orange-lg transition-all duration-300 font-semibold"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Explore Events
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group font-semibold animated-border"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-orange rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">50k+</div>
                  <div className="text-muted-foreground">Happy Users</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-orange rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">1000+</div>
                  <div className="text-muted-foreground">Premium Events</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in">
            <div className="relative">
              {/* Main visual container */}
              <div className="aspect-square rounded-2xl bg-gradient-charcoal p-8 relative overflow-hidden border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
                
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-24 h-24 bg-gradient-orange rounded-full flex items-center justify-center mb-6 animate-pulse-glow">
                    <Calendar className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-3">Your Night Awaits</h3>
                  <p className="text-muted-foreground font-light">Premium nightlife experiences</p>
                  
                  {/* Floating particles */}
                  <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-float" />
                  <div className="absolute top-8 right-8 w-3 h-3 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute bottom-6 left-8 w-1 h-1 bg-primary rounded-full animate-float" style={{ animationDelay: '1s' }} />
                </div>
              </div>
              
              {/* Enhanced floating cards */}
              <div className="absolute -top-6 -right-6 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-2xl animate-float glow-orange" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-semibold">Live Event</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">234 people attending</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold">VIP Available</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Book now for tonight</div>
              </div>
              
              <div className="absolute top-1/2 -left-4 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-3 shadow-2xl animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-xs font-semibold">Premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
