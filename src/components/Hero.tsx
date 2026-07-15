import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, Calendar, MapPin } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';

const Hero = () => {
  const content = useSiteContent();

  const scrollToWaitlist = () => {
    const waitlistSection = document.querySelector('#waitlist');
    waitlistSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-500 font-medium">Toronto</span>
              </div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <span className="text-sm text-gray-400">Coming Soon</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              {content.hero_headline || (
                <>
                  Toronto's Premier{' '}
                  <span className="text-gradient block mt-2">Nightlife App</span>
                </>
              )}
            </h1>

            <p className="text-xl lg:text-2xl text-orange-500 font-semibold mb-4">
              VIP Bookings • Digital Tickets • Exclusive Access
            </p>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {content.hero_subtext ||
                "Skip the lines, secure your table, and experience Toronto's hottest venues with BottlesUp. From King Street to Entertainment District - your night out, elevated."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                onClick={scrollToWaitlist}
                className="bg-gradient-orange hover:opacity-90 text-black font-bold border-0 group glow-orange"
              >
                Join Early Access
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black group"
              >
                <Play className="w-4 h-4 mr-2" />
                See Preview
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-orange-500" />
                <span>500+ Early Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>50+ Partner Venues</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in">
            <div className="relative">
              {/* Main image placeholder */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <img 
                    src="/app_logo.svg" 
                    alt="BottlesUp Logo" 
                    className="w-20 h-20 mb-4 animate-float"
                  />
                  <h3 className="text-2xl font-bold mb-2 text-white">BottlesUp</h3>
                  <p className="text-gray-400">Toronto's Nightlife Revolution</p>
                  <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-xs">
                    <div className="bg-black/50 rounded-lg p-3 text-center border border-gray-700">
                      <div className="text-orange-500 font-bold">VIP</div>
                      <div className="text-xs text-gray-400">Tables</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 text-center border border-gray-700">
                      <div className="text-orange-500 font-bold">Digital</div>
                      <div className="text-xs text-gray-400">Tickets</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-6 -right-6 bg-black border border-orange-500/50 rounded-lg p-4 shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white">Live</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-black border border-green-500/50 rounded-lg p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white">Available</span>
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
