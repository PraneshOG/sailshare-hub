import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BoatCard from '@/components/boats/BoatCard';
import { fetchBoats, Boat } from '@/integrations/supabase/services';
import { Sliders, Search, AlertCircle, Ship, ArrowRight, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Parse query parameters
  const params = new URLSearchParams(location.search);
  const fromParam = params.get('from') || '';
  const toParam = params.get('to') || '';
  const departureParam = params.get('departure') || '';
  const returnParam = params.get('return') || '';
  const tripType = params.get('tripType') || 'round-trip';
  const cabinClass = params.get('cabinClass') || 'economy';
  
  let passengers: any[] = [];
  const passengersParam = params.get('passengers');
  if (passengersParam) {
    try {
      passengers = JSON.parse(passengersParam);
    } catch (e) {
      console.error("Failed to parse passengers data");
    }
  }

  // Format dates for display
  const departureDate = departureParam ? new Date(departureParam) : null;
  const returnDate = returnParam ? new Date(returnParam) : null;
  
  useEffect(() => {
    const loadBoats = async () => {
      setIsLoading(true);
      try {
        const boatsData = await fetchBoats();
        // Filter boats based on search criteria
        const filteredBoats = boatsData.filter(boat => {
          let match = true;
          if (fromParam) {
            match = match && boat.location.toLowerCase().includes(fromParam.toLowerCase());
          }
          if (toParam) {
            // In a real app, you would match the destination
            // For this demo, we're just keeping all boats
          }
          return match;
        });
        
        setBoats(filteredBoats);
      } catch (error) {
        console.error("Error loading boats:", error);
        toast({
          title: "Error loading boats",
          description: "There was a problem loading available boats. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBoats();
  }, [location.search, toast]);
  
  // Calculate total passengers
  const totalPassengers = passengers.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Search summary */}
          <div className="bg-indigo-800/50 rounded-xl p-4 mb-6 shadow-lg border border-indigo-700/30">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center">
                    <Ship className="h-5 w-5 text-blue-300 mr-2" />
                    <span className="font-medium">{fromParam}</span>
                  </div>
                  
                  <ArrowRight className="hidden sm:block h-4 w-4 text-blue-300 mx-1" />
                  
                  <div className="flex items-center">
                    <Ship className="h-5 w-5 text-blue-300 mr-2" />
                    <span className="font-medium">{toParam}</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-blue-300/30 mx-2 hidden md:block"></div>
                
                <div className="flex items-center mt-2 md:mt-0">
                  <Calendar className="h-4 w-4 text-blue-300 mr-2" />
                  <span>
                    {departureDate ? format(departureDate, 'dd MMM') : 'Any date'}
                    {tripType === 'round-trip' && returnDate && ` - ${format(returnDate, 'dd MMM')}`}
                  </span>
                </div>
                
                <div className="h-4 w-px bg-blue-300/30 mx-2 hidden md:block"></div>
                
                <div className="flex items-center mt-2 md:mt-0">
                  <Users className="h-4 w-4 text-blue-300 mr-2" />
                  <span>{totalPassengers} passenger{totalPassengers !== 1 ? 's' : ''}</span>
                </div>
                
                <div className="h-4 w-px bg-blue-300/30 mx-2 hidden md:block"></div>
                
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="capitalize">{cabinClass}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-3 md:mt-0 border-blue-400/30 text-white hover:bg-indigo-700/50"
                onClick={() => navigate(-1)}
              >
                Modify Search
              </Button>
            </div>
          </div>
          
          {/* Results tabs */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <Tabs defaultValue="departure">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="departure" className="text-sm">Departure</TabsTrigger>
                  {tripType === 'round-trip' && (
                    <TabsTrigger value="return" className="text-sm">Return</TabsTrigger>
                  )}
                </TabsList>
                
                <div className="text-sm text-gray-500">
                  {boats.length} result{boats.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <TabsContent value="departure" className="mt-2">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-gray-100 h-32 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                ) : boats.length > 0 ? (
                  <div className="space-y-4">
                    {boats.map((boat) => (
                      <div 
                        key={boat.id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-white"
                      >
                        <div className="grid grid-cols-12 gap-4">
                          {/* Left: Boat info */}
                          <div className="col-span-8 flex">
                            <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                              <Ship className="h-8 w-8 text-indigo-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">{boat.name}</h3>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <span>{boat.type}</span>
                                <span className="mx-2">•</span>
                                <span>Capacity: {boat.capacity} persons</span>
                              </div>
                              <div className="mt-2 flex">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {fromParam || boat.location} → {toParam || 'Destination'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right: Price and CTA */}
                          <div className="col-span-4 flex flex-col items-end justify-between">
                            <div className="text-right">
                              <p className="text-sm text-gray-500">From</p>
                              <p className="text-xl font-semibold">฿{boat.price_per_hour.toLocaleString()}</p>
                              <p className="text-sm text-gray-500">per person</p>
                            </div>
                            
                            <Link to={`/boats/${boat.id}`}>
                              <Button className="bg-red-500 hover:bg-red-600 text-white">
                                Select
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No boats found</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      We couldn't find any boats matching your search criteria. Try adjusting your search parameters.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={() => navigate(-1)}
                    >
                      Back to Search
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              {tripType === 'round-trip' && (
                <TabsContent value="return" className="mt-2">
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-600">
                      Please select your departure boat first to view return options.
                    </p>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
