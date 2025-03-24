
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BoatCard from '@/components/boats/BoatCard';
import { getAllBoats, Boat } from '@/data/boats';
import { Sliders, Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BoatsPage = () => {
  const location = useLocation();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [filteredBoats, setFilteredBoats] = useState<Boat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedBoatTypes, setSelectedBoatTypes] = useState<string[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<number | null>(null);
  
  useEffect(() => {
    // Parse query parameters
    const params = new URLSearchParams(location.search);
    const locationParam = params.get('location');
    if (locationParam) {
      setSearchTerm(locationParam);
    }

    // Simulate API loading delay
    const timer = setTimeout(() => {
      const allBoats = getAllBoats();
      setBoats(allBoats);
      setFilteredBoats(allBoats);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.search]);
  
  useEffect(() => {
    if (boats.length > 0) {
      let results = [...boats];
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        results = results.filter(
          boat => 
            boat.name.toLowerCase().includes(term) || 
            boat.location.toLowerCase().includes(term) ||
            boat.type.toLowerCase().includes(term)
        );
      }
      
      // Apply price filter
      results = results.filter(
        boat => boat.price >= priceRange[0] && boat.price <= priceRange[1]
      );
      
      // Apply boat type filter
      if (selectedBoatTypes.length > 0) {
        results = results.filter(boat => selectedBoatTypes.includes(boat.type));
      }
      
      // Apply capacity filter
      if (selectedCapacity) {
        results = results.filter(boat => boat.capacity >= selectedCapacity);
      }
      
      setFilteredBoats(results);
    }
  }, [searchTerm, boats, priceRange, selectedBoatTypes, selectedCapacity]);
  
  // Get unique boat types for filter
  const boatTypes = [...new Set(boats.map(boat => boat.type))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Boat</h1>
              <p className="text-gray-600 mt-2">
                {filteredBoats.length} boat{filteredBoats.length !== 1 ? 's' : ''} available
                {searchTerm ? ` in "${searchTerm}"` : ''}
              </p>
            </div>
            
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Sliders className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all"
                placeholder="Search by location, boat type, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filters Section - Expandable */}
            {showFilters && (
              <div className="bg-white shadow-md rounded-lg p-6 mt-4 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range (per hour)</h4>
                    <div className="flex items-center gap-4">
                      <input 
                        type="number" 
                        min="0"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent"
                      />
                      <span>to</span>
                      <input 
                        type="number" 
                        min={priceRange[0]}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Boat Type */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Boat Type</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {boatTypes.map(type => (
                        <label key={type} className="inline-flex items-center">
                          <input 
                            type="checkbox"
                            className="rounded text-ocean-600 focus:ring-ocean-500"
                            checked={selectedBoatTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBoatTypes([...selectedBoatTypes, type]);
                              } else {
                                setSelectedBoatTypes(selectedBoatTypes.filter(t => t !== type));
                              }
                            }}
                          />
                          <span className="ml-2 text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Capacity */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Guest Capacity</h4>
                    <select 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent"
                      value={selectedCapacity || ''}
                      onChange={(e) => setSelectedCapacity(e.target.value ? parseInt(e.target.value) : null)}
                    >
                      <option value="">Any capacity</option>
                      <option value="2">2+ guests</option>
                      <option value="4">4+ guests</option>
                      <option value="6">6+ guests</option>
                      <option value="8">8+ guests</option>
                      <option value="10">10+ guests</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      // Reset filters
                      setPriceRange([0, 500]);
                      setSelectedBoatTypes([]);
                      setSelectedCapacity(null);
                      setSearchTerm('');
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button 
                    variant="default"
                    className="bg-ocean-600 hover:bg-ocean-700"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-xl p-4 h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filteredBoats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBoats.map((boat) => (
                <BoatCard key={boat.id} boat={boat} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No boats found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any boats matching your search criteria. Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BoatsPage;
