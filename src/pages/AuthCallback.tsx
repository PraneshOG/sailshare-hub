import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Process the OAuth or magic link callback
    const handleAuthCallback = async () => {
      const { hash, searchParams } = new URL(window.location.href);
      
      // Handle OAuth redirect
      if (hash || searchParams.toString()) {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          navigate('/auth', { replace: true });
          return;
        }
        
        // If we have a session, check if user is admin
        if (data.session) {
          const userId = data.session.user.id;
          
          // Check if user is admin
          const { data: adminData } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', userId)
            .single();
          
          if (adminData) {
            // If user is admin, redirect to admin dashboard
            navigate('/admin', { replace: true });
            return;
          }
          
          // Otherwise, redirect to home page
          navigate('/', { replace: true });
          return;
        }
      }
      
      // If we don't have a session, redirect to auth page
      navigate('/auth', { replace: true });
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-ocean-600" />
      <h2 className="mt-4 text-xl font-medium text-gray-700">Completing authentication...</h2>
    </div>
  );
};

export default AuthCallback;
