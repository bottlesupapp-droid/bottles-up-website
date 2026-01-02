import { Instagram, Twitter, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/app_logo.svg" 
                alt="BottlesUp Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gradient">BottlesUp</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Toronto's premier nightlife app for VIP bookings and digital tickets. 
              Elevating your night out experience across the city.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/bottlesupapp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/bottlesup_to" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/bottlesup.toronto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/bottlesup-toronto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Users */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Users</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-orange-500 transition-colors">Browse Events</a></li>
              <li><a href="#booking" className="text-gray-400 hover:text-orange-500 transition-colors">VIP Tables</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Digital Tickets</a></li>
              <li><a href="#waitlist" className="text-gray-400 hover:text-orange-500 transition-colors">Join Waitlist</a></li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Partners</h3>
            <ul className="space-y-2">
              <li><a href="mailto:partners@bottlesup.to" className="text-gray-400 hover:text-orange-500 transition-colors">Venue Partnership</a></li>
              <li><a href="mailto:promoters@bottlesup.to" className="text-gray-400 hover:text-orange-500 transition-colors">Promoter Portal</a></li>
              <li><a href="mailto:events@bottlesup.to" className="text-gray-400 hover:text-orange-500 transition-colors">Event Listing</a></li>
              <li><a href="mailto:business@bottlesup.to" className="text-gray-400 hover:text-orange-500 transition-colors">Business Inquiries</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Toronto, ON, Canada</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-500" />
                <a href="mailto:hello@bottlesup.to" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
                  hello@bottlesup.to
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href="tel:+14169999999" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
                  +1 (416) 999-9999
                </a>
              </div>
            </div>
            
            {/* Quick Contact for Partners */}
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
              <h4 className="text-sm font-semibold text-orange-500 mb-2">Partners & Promoters</h4>
              <p className="text-xs text-gray-400 mb-3">Want to list your venue or event?</p>
              <a 
                href="mailto:partners@bottlesup.to" 
                className="inline-flex items-center text-xs bg-orange-500 text-black px-3 py-1 rounded-md font-medium hover:bg-orange-600 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>

        {/* Toronto Neighborhoods */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="font-semibold text-white mb-4 text-center">Serving Toronto's Hottest Neighborhoods</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="hover:text-orange-500 transition-colors cursor-pointer">Entertainment District</span>
            <span className="hover:text-orange-500 transition-colors cursor-pointer">King Street West</span>
            <span className="hover:text-orange-500 transition-colors cursor-pointer">Queen Street West</span>
            <span className="hover:text-orange-500 transition-colors cursor-pointer">Financial District</span>
            <span className="hover:text-orange-500 transition-colors cursor-pointer">Yorkville</span>
            <span className="hover:text-orange-500 transition-colors cursor-pointer">Distillery District</span>
            <span className="hover:text-orange-500 transition-colors cursor-pointer">Liberty Village</span>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 BottlesUp. All rights reserved. Toronto's Premier Nightlife App.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
              Privacy Policy
            </Link>
            <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
