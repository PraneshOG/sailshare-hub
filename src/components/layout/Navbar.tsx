
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Search, Boat } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-ocean-700 transition-all duration-300"
        >
          <Boat className="h-8 w-8 text-ocean-600" />
          <span className="hidden sm:inline">SailShare</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/boats" 
            className="text-gray-700 hover:text-ocean-600 transition-colors font-medium"
          >
            Find Boats
          </Link>
          <Link 
            to="/how-it-works" 
            className="text-gray-700 hover:text-ocean-600 transition-colors font-medium"
          >
            How It Works
          </Link>
          <Link 
            to="/about" 
            className="text-gray-700 hover:text-ocean-600 transition-colors font-medium"
          >
            About Us
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" className="rounded-full">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Link to="/auth">
            <Button 
              variant="default" 
              size="sm" 
              className="rounded-full bg-ocean-600 hover:bg-ocean-700"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in-up">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link 
              to="/boats" 
              className="text-gray-700 hover:text-ocean-600 py-2 border-b border-gray-100"
            >
              Find Boats
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-gray-700 hover:text-ocean-600 py-2 border-b border-gray-100"
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-ocean-600 py-2 border-b border-gray-100"
            >
              About Us
            </Link>
            <div className="flex items-center justify-between pt-2 gap-4">
              <Button variant="outline" className="w-1/2 rounded-full">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Link to="/auth" className="w-1/2">
                <Button 
                  variant="default" 
                  className="w-full rounded-full bg-ocean-600 hover:bg-ocean-700"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
