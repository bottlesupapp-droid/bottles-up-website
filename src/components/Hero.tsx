
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Rated 4.9/5 by users</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Book the{' '}
              <span className="text-gradient">Perfect Night</span>{' '}
              Out
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover exclusive events, book VIP tables, and experience the hottest venues in your city. 
              Bottles Up brings the nightlife to your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-orange hover:opacity-90 text-white border-0 group"
              >
                Explore Events
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span>50k+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>1000+ Events</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in">
            <div className="relative">
              {/* Main image placeholder */}
              <div className="aspect-square rounded-2xl bg-gradient-dark p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center mb-4 animate-float">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Your Night Awaits</h3>
                  <p className="text-muted-foreground">Premium events at your fingertips</p>
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-6 -right-6 bg-card border border-border rounded-lg p-4 shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="text-sm font-medium">Live Event</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium">Available</span>
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
