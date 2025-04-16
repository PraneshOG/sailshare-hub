
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect URL from the location state or default to '/'
  const redirectTo = location.state?.from || '/';
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (adminData) {
          // If user is admin, redirect to admin dashboard
          navigate('/admin', { replace: true });
        } else {
          // If user is not admin, redirect to home
          navigate(redirectTo, { replace: true });
        }
      }
      
      setCheckingAuth(false);
    };
    
    checkAuth();
  }, [navigate, redirectTo]);
  
  // Sign In with Email
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignIn) {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        
        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (adminData) {
          // If user is admin, redirect to admin dashboard
          navigate('/admin', { replace: true });
        } else {
          // If user is not admin, redirect to home
          navigate(redirectTo, { replace: true });
        }
      } else {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account.",
        });
        
        // Auto-login if email verification is disabled
        if (data.session) {
          navigate(redirectTo);
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sign In with Google
  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Google Sign In failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };
  
  // Sign In with Magic Link
  const handleMagicLink = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Magic link sent!",
        description: `Check your email (${email}) for the login link`,
      });
    } catch (error: any) {
      toast({
        title: "Failed to send magic link",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ocean-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                  {isSignIn ? 'Welcome Back' : 'Create Your Account'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {isSignIn 
                    ? 'Sign in to access your SailShare account' 
                    : 'Join SailShare to start exploring boats near you'}
                </p>
              </div>
              
              {/* Auth Form */}
              <form onSubmit={handleAuth} className="space-y-4">
                {/* Name Field (Sign Up only) */}
                {!isSignIn && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        id="name"
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={!isSignIn}
                      />
                    </div>
                  </div>
                )}
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    {isSignIn && (
                      <Link to="/forgot-password" className="text-xs text-ocean-600 hover:text-ocean-700">
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password"
                      className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-medium py-2 rounded-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {isSignIn ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    isSignIn ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </form>
              
              {/* Magic Link Option */}
              {isSignIn && (
                <div className="mt-4">
                  <button 
                    type="button"
                    onClick={handleMagicLink}
                    disabled={isLoading}
                    className="w-full text-center text-ocean-600 hover:text-ocean-700 text-sm font-medium flex items-center justify-center gap-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Sending link...
                      </>
                    ) : (
                      <>
                        Sign in with Magic Link
                        <ArrowRight className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </div>
              )}
              
              {/* Divider */}
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or continue with</span>
                </div>
              </div>
              
              {/* Social Login */}
              <div className="mt-6">
                <button 
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                  </svg>
                  Google
                </button>
              </div>
              
              {/* Toggle between Sign In and Sign Up */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isSignIn ? "Don't have an account?" : "Already have an account?"}
                  <button 
                    type="button"
                    className="ml-1 text-ocean-600 hover:text-ocean-700 font-medium"
                    onClick={() => setIsSignIn(!isSignIn)}
                  >
                    {isSignIn ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
