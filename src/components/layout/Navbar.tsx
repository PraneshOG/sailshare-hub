
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Ship, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        setUserEmail(session?.user?.email || '');
        if (session) {
          checkAdmin(session.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Initial auth check
    const checkInitialAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      if (session) {
        setUserEmail(session.user.email || '');
        checkAdmin(session.user.id);
      }
    };
    
    checkInitialAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAdmin = async (userId) => {
    const { data } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', userId)
      .single();
    
    setIsAdmin(!!data);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-indigo-900/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-white transition-all duration-300"
        >
          <Ship className="h-8 w-8 text-orange-500" />
          <span className="hidden sm:inline gradient-text bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">AsterTech Book Now</span>
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAdmin && (
            <Link to="/admin">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-white/20 hover:bg-white/30 border-none transition-all duration-300 text-white
                          hover:text-white hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                Dashboard
              </Button>
            </Link>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-white text-sm">{userEmail}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="rounded-full bg-white/20 hover:bg-white/30 border-none transition-all duration-300 text-white
                          hover:text-white hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-white/20 hover:bg-white/30 border-none transition-all duration-300 text-white
                          hover:text-white hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                <User className="h-4 w-4 mr-2" />
                Sign in
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
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
        <div className="md:hidden bg-indigo-900 border-t border-indigo-800 animate-fade-in-up">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            {isAdmin && (
              <Link to="/admin" className="w-full">
                <Button 
                  variant="outline"
                  className="w-full rounded-full bg-white/20 hover:bg-white/30 border-none text-white 
                           hover:scale-105 hover:shadow-md backdrop-blur-sm transition-all duration-300"
                >
                  Dashboard
                </Button>
              </Link>
            )}
            <div className="flex items-center justify-between pt-2 gap-4">
              {isAuthenticated ? (
                <div className="w-full flex flex-col gap-2">
                  <span className="text-white text-sm">{userEmail}</span>
                  <Button 
                    variant="outline"
                    onClick={handleSignOut}
                    className="w-full rounded-full bg-white/20 hover:bg-white/30 border-none text-white 
                             hover:scale-105 hover:shadow-md backdrop-blur-sm transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="w-full">
                  <Button 
                    variant="outline"
                    className="w-full rounded-full bg-white/20 hover:bg-white/30 border-none text-white 
                             hover:scale-105 hover:shadow-md backdrop-blur-sm transition-all duration-300"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
