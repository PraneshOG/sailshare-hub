import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fetchBoats, Boat, JourneyDetails } from '@/integrations/supabase/services';
import { AlertCircle, ArrowRight, Calendar, Users } from 'lucide-react';
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
  const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
  const [selectedDepartureDetails, setSelectedDepartureDetails] = useState<JourneyDetails | null>(null);
  
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

  const handleSelectJourney = (index: number, journeyType: 'departure' | 'return') => {
    // Generate time details for the selected journey
    const timeDetails = generateTimeDetails(index);
    
    // For departure journey in round trip, save the selection and details
    if (tripType === 'round-trip' && journeyType === 'departure') {
      setSelectedDeparture(`journey-${index}`);
      setSelectedDepartureDetails({
        date: departureParam,
        time: timeDetails.departureTime,
        from: fromParam,
        to: toParam,
        price: boats.length > 0 ? boats[0].price_per_hour : 0,
        duration: 4 // Default duration in hours
      });
      return;
    }
    
    // For one-way or return journey, proceed to checkout
    const currentDate = journeyType === 'return' ? returnParam : departureParam;
    const currentPrice = (boats.length > 0 ? boats[0].price_per_hour : 0) * 4 + 800; // 4 hours + fees
    
    // Create booking details
    const bookingDetails = {
      tripType: tripType,
      departure: selectedDepartureDetails || {
        date: departureParam,
        time: timeDetails.departureTime,
        from: fromParam,
        to: toParam,
        price: boats.length > 0 ? boats[0].price_per_hour : 0,
        duration: 4 // Default duration in hours
      },
      return: journeyType === 'return' ? {
        date: returnParam,
        time: timeDetails.departureTime,
        from: toParam,
        to: fromParam,
        price: boats.length > 0 ? boats[0].price_per_hour : 0,
        duration: 4 // Default duration in hours
      } : null,
      totalPrice: tripType === 'round-trip' ? currentPrice * 2 : currentPrice,
      guestCount: totalPassengers,
      boatId: boats.length > 0 ? boats[0].id : "",
      boatImage: boats.length > 0 ? boats[0].images[0] : ""
    };
    
    navigate('/checkout', { state: bookingDetails });
  };
  
  // Generate pseudo-random departure/arrival times based on index
  const generateTimeDetails = (index: number) => {
    const hour = 7 + (index * 3) % 12;
    const period = hour > 11 ? "PM" : "AM";
    const departureTime = `${hour === 0 ? 12 : hour}:00 ${period}`;
    const arrivalTime = `${(hour + 2) % 12 === 0 ? 12 : (hour + 2) % 12}:30 ${period}`;
    
    return {
      departureTime,
      arrivalTime
    };
  };

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
                    <span className="font-medium">{fromParam}</span>
                  </div>
                  
                  <ArrowRight className="hidden sm:block h-4 w-4 text-blue-300 mx-1" />
                  
                  <div className="flex items-center">
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
                    <TabsTrigger value="return" className="text-sm" disabled={!selectedDeparture}>Return</TabsTrigger>
                  )}
                </TabsList>
                
                <div className="text-sm text-gray-500">
                  {isLoading ? 'Loading...' : `${boats.length > 0 ? 5 : 0} journeys available`}
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
                    {[...Array(5)].map((_, index) => {
                      const { departureTime, arrivalTime } = generateTimeDetails(index);
                      
                      return (
                        <div 
                          key={`journey-${index}`}
                          className={`border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-white ${
                            selectedDeparture === `journey-${index}` ? 'ring-2 ring-blue-400' : ''
                          }`}
                        >
                          <div className="grid grid-cols-12 gap-4 items-center">
                            {/* Middle: Times and route */}
                            <div className="col-span-8 lg:col-span-9">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="text-center">
                                    <div className="text-lg font-semibold">{departureTime}</div>
                                    <div className="text-xs text-gray-500">{fromParam}</div>
                                  </div>
                                  
                                  <div className="flex flex-col items-center">
                                    <div className="text-xs text-gray-500">2h 30m</div>
                                    <div className="relative w-16 md:w-24">
                                      <div className="border-t border-gray-300 absolute top-1/2 w-full"></div>
                                      <ArrowRight className="h-4 w-4 text-gray-400 absolute top-1/2 right-0 transform -translate-y-1/2" />
                                    </div>
                                  </div>
                                  
                                  <div className="text-center">
                                    <div className="text-lg font-semibold">{arrivalTime}</div>
                                    <div className="text-xs text-gray-500">{toParam || 'Destination'}</div>
                                  </div>
                                </div>
                                
                                <div className="mt-2 md:mt-0">
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {Math.floor(Math.random() * 20) + 10} seats available
                                  </span>
                                  
                                  <div className="text-xs text-gray-500 mt-1">
                                    Cabin: {cabinClass}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Right: Price and CTA */}
                            <div className="col-span-4 lg:col-span-3 flex flex-col items-end justify-between">
                              <div className="text-right">
                                <p className="text-sm text-gray-500">From</p>
                                <p className="text-xl font-semibold">฿{(1000 + index * 200).toLocaleString()}</p>
                                <p className="text-sm text-gray-500">per person</p>
                              </div>
                              
                              <Button 
                                className="bg-red-500 hover:bg-red-600 text-white"
                                onClick={() => handleSelectJourney(index, 'departure')}
                              >
                                {tripType === 'round-trip' ? 'Select' : 'Book Now'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No journeys found</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      We couldn't find any journeys matching your search criteria. Try adjusting your search parameters.
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
                  {selectedDeparture ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => {
                        const { departureTime, arrivalTime } = generateTimeDetails(index + 2);
                        
                        return (
                          <div 
                            key={`return-journey-${index}`}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-white"
                          >
                            <div className="grid grid-cols-12 gap-4 items-center">
                              {/* Middle: Times and route */}
                              <div className="col-span-8 lg:col-span-9">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="text-center">
                                      <div className="text-lg font-semibold">{departureTime}</div>
                                      <div className="text-xs text-gray-500">{toParam}</div>
                                    </div>
                                    
                                    <div className="flex flex-col items-center">
                                      <div className="text-xs text-gray-500">2h 30m</div>
                                      <div className="relative w-16 md:w-24">
                                        <div className="border-t border-gray-300 absolute top-1/2 w-full"></div>
                                        <ArrowRight className="h-4 w-4 text-gray-400 absolute top-1/2 right-0 transform -translate-y-1/2" />
                                      </div>
                                    </div>
                                    
                                    <div className="text-center">
                                      <div className="text-lg font-semibold">{arrivalTime}</div>
                                      <div className="text-xs text-gray-500">{fromParam}</div>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-2 md:mt-0">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                      {Math.floor(Math.random() * 20) + 10} seats available
                                    </span>
                                    
                                    <div className="text-xs text-gray-500 mt-1">
                                      Cabin: {cabinClass}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Right: Price and CTA */}
                              <div className="col-span-4 lg:col-span-3 flex flex-col items-end justify-between">
                                <div className="text-right">
                                  <p className="text-sm text-gray-500">From</p>
                                  <p className="text-xl font-semibold">฿{(800 + index * 300).toLocaleString()}</p>
                                  <p className="text-sm text-gray-500">per person</p>
                                </div>
                                
                                <Button 
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                  onClick={() => handleSelectJourney(index, 'return')}
                                >
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <p className="text-gray-600">
                        Please select your departure journey first to view return options.
                      </p>
                    </div>
                  )}
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
