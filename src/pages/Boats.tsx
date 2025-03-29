
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BoatCard from '@/components/boats/BoatCard';
import SearchBar from '@/components/common/SearchBar';
import MainSidebar from '@/components/layout/MainSidebar';
import { boats } from '@/data/boats';

// Define props type according to expected props
interface SearchParams {
  location: string;
  dates: {
    from: Date | null;
    to: Date | null;
  };
  guests: number;
}

const Boats = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredBoats, setFilteredBoats] = useState(boats);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    dates: {
      from: null,
      to: null
    },
    guests: 1
  });

  useEffect(() => {
    // Parse location state if available
    if (location.state) {
      setSearchParams(location.state);
      
      // Apply filters based on search params
      const filtered = boats.filter((boat) => {
        // Filter by location if provided
        if (location.state.location && !boat.location.toLowerCase().includes(location.state.location.toLowerCase())) {
          return false;
        }
        
        // Filter by capacity if guests are provided
        if (location.state.guests && boat.capacity < location.state.guests) {
          return false;
        }
        
        return true;
      });
      
      setFilteredBoats(filtered);
    }
  }, [location.state]);

  const handleSearch = (searchData: any) => {
    setSearchParams(searchData);
    
    // Apply filters
    const filtered = boats.filter((boat) => {
      // Filter by location if provided
      if (searchData.location && !boat.location.toLowerCase().includes(searchData.location.toLowerCase())) {
        return false;
      }
      
      // Filter by capacity if guests are provided
      if (searchData.guests && boat.capacity < searchData.guests) {
        return false;
      }
      
      return true;
    });
    
    setFilteredBoats(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 w-full">
      <Navbar />
      
      <div className="flex flex-1 w-full">
        <MainSidebar />
        
        <main className="flex-grow px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Find your perfect boat</h2>
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {filteredBoats.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl text-white font-medium">No boats match your search criteria</h3>
                <p className="text-gray-200 mt-2">Try adjusting your search or explore all available boats</p>
                <button 
                  onClick={() => setFilteredBoats(boats)}
                  className="mt-4 bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                >
                  Show all boats
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Available Boats {searchParams.location && `in ${searchParams.location}`}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBoats.map((boat) => (
                    <div key={boat.id} onClick={() => navigate(`/boats/${boat.id}`)}>
                      <BoatCard boat={boat} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Boats;
