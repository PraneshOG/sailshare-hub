
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Ship } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-purple-950 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/mobile" className="text-gray-300 hover:text-white transition-colors">
                  Mobile
                </Link>
              </li>
              <li>
                <Link to="/discover" className="text-gray-300 hover:text-white transition-colors">
                  Discover
                </Link>
              </li>
              <li>
                <Link to="/how-we-work" className="text-gray-300 hover:text-white transition-colors">
                  How we work
                </Link>
              </li>
              <li>
                <Link to="/coupon-codes" className="text-gray-300 hover:text-white transition-colors">
                  SailShare coupon codes
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help/FAQ
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-300 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/affiliates" className="text-gray-300 hover:text-white transition-colors">
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>
          
          {/* More Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">More</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/fees" className="text-gray-300 hover:text-white transition-colors">
                  Boat fees
                </Link>
              </li>
              <li>
                <Link to="/boats" className="text-gray-300 hover:text-white transition-colors">
                  Boats
                </Link>
              </li>
            </ul>
          </div>
          
          {/* App Download */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Get the SailShare app</h3>
            <div className="flex flex-col space-y-3">
              <a href="#" className="block">
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                  alt="Get it on Google Play" 
                  className="h-10"
                />
              </a>
              <a href="#" className="block">
                <img 
                  src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" 
                  alt="Download on the App Store"  
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-purple-900 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">
            <p>©2023 SailShare</p>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6">
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
            <img src="https://www.pngitem.com/pimgs/m/225-2258799_booking-com-logo-png-transparent-png.png" alt="Booking.com" className="h-8" />
          </a>
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
            <img src="https://logos-world.net/wp-content/uploads/2022/05/KAYAK-Logo.png" alt="KAYAK" className="h-8" />
          </a>
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
            <img src="https://logos-world.net/wp-content/uploads/2022/07/OpenTable-Logo.png" alt="OpenTable" className="h-8" />
          </a>
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
            <img src="https://logos-world.net/wp-content/uploads/2021/02/Priceline-Logo.png" alt="Priceline" className="h-8" />
          </a>
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Agoda_logo.svg" alt="Agoda" className="h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
