
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BoatCard from '@/components/boats/BoatCard';
import { fetchBoats, Boat } from '@/integrations/supabase/services';
import { Sliders, Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from '@/components/layout/MainSidebar';
import SearchBar from '@/components/common/SearchBar';

const BoatsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Parse query parameters
    const params = new URLSearchParams(location.search);
    const fromParam = params.get('from');
    if (fromParam) {
      setSearchTerm(fromParam);
    }

    // Load boats from Supabase - but just take the first one
    const loadBoats = async () => {
      setIsLoading(true);
      try {
        const boatsData = await fetchBoats();
        // Just get the first boat
        setBoat(boatsData.length > 0 ? boatsData[0] : null);
      } catch (error) {
        console.error('Error loading boats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBoats();
  }, [location.search]);
  
  const handleViewBoat = (boatId: string) => {
    navigate(`/boats/${boatId}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <Navbar />
        
        <div className="flex flex-1 pt-24">
          <MainSidebar />
          
          <main className="flex-grow pb-20 px-4">
            <div className="container mx-auto">
              {/* SearchBar at the top */}
              <div className="mb-8">
                <SearchBar compact={true} />
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white">Find Your Perfect Boat</h1>
                  <p className="text-blue-200 mt-2">
                    {boat ? '1 boat available' : 'No boats available'}
                    {searchTerm ? ` in "${searchTerm}"` : ''}
                  </p>
                </div>
              </div>
              
              {/* Results */}
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="bg-indigo-800/40 rounded-xl p-4 h-80 w-full max-w-md animate-pulse"></div>
                </div>
              ) : boat ? (
                <div className="flex justify-center">
                  <div className="max-w-md w-full" onClick={() => handleViewBoat(boat.id)}>
                    <BoatCard 
                      key={boat.id} 
                      boat={boat}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 bg-indigo-800/30 rounded-xl border border-purple-700/30">
                  <AlertCircle className="h-12 w-12 text-blue-200 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No boats found</h3>
                  <p className="text-blue-200 max-w-md mx-auto">
                    We couldn't find any boats matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default BoatsPage;
