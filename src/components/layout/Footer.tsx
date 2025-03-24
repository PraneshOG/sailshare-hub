
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Ship, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <Ship className="h-8 w-8" />
              <span>SailShare</span>
            </Link>
            <p className="text-gray-300 mb-6">
              Experience the freedom of the water with our premium boat rental marketplace.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/boats" className="text-gray-300 hover:text-white transition-colors">
                  Find Boats
                </Link>
              </li>
              <li>
                <Link to="/list-your-boat" className="text-gray-300 hover:text-white transition-colors">
                  List Your Boat
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Mail className="h-5 w-5 text-ocean-400" />
                <span>support@sailshare.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Phone className="h-5 w-5 text-ocean-400" />
                <span>+91 (800) 555-SAIL</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 text-white">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-navy-800 text-white rounded-l-lg focus:outline-none border border-navy-700 focus:border-ocean-500 w-full"
                />
                <button className="bg-ocean-600 px-4 py-2 rounded-r-lg hover:bg-ocean-500 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-navy-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SailShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
