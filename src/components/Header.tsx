
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Calendar, Users, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-orange rounded-xl flex items-center justify-center glow-orange">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-gradient">Bottles Up</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-orange transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#events" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group">
              Events
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-orange transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#venues" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group">
              Venues
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-orange transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-orange transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-300">
              Sign In
            </Button>
            <Button className="bg-gradient-orange hover:opacity-90 text-white border-0 glow-orange hover:glow-orange-lg transition-all duration-300 font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border animate-fade-in bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                Features
              </a>
              <a href="#events" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                Events
              </a>
              <a href="#venues" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                Venues
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                Contact
              </a>
              <div className="flex flex-col space-y-3 pt-4">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                  Sign In
                </Button>
                <Button className="bg-gradient-orange hover:opacity-90 text-white border-0 font-semibold">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
