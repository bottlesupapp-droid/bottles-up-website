
import { Calendar, Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/80 border-t border-border/50 pt-20 pb-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-orange rounded-2xl flex items-center justify-center glow-orange">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-display font-bold text-gradient">Bottles Up</span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg font-light max-w-md">
              Your gateway to the world's most exclusive nightlife experiences. Book premium events and VIP tables with unparalleled ease and style.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@bottlesup.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>New York, NY</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 bg-gradient-charcoal border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-6 text-xl">Explore</h3>
            <ul className="space-y-3">
              {['Browse Events', 'Find Venues', 'Group Bookings', 'VIP Services', 'Gift Cards'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-light text-lg relative group">
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-orange transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-6 text-xl">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Contact Us', 'Safety Guidelines', 'Cancellation Policy', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-light text-lg relative group">
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-orange transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-6 text-xl">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Press Kit', 'Partners', 'Investors'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-light text-lg relative group">
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-orange transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground font-light">
            © 2024 Bottles Up. All rights reserved. Made with passion for nightlife.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a 
                key={link}
                href="#" 
                className="text-muted-foreground hover:text-primary text-sm transition-colors relative group font-light"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-orange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
