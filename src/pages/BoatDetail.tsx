
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Anchor, Ship, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchBoats, Boat } from '@/integrations/supabase/services';
import SearchBar from '@/components/common/SearchBar';

const BoatDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guestCount, setGuestCount] = useState(2);
  const [duration, setDuration] = useState(4);
  
  useEffect(() => {
    const loadBoat = async () => {
      setIsLoading(true);
      
      try {
        const boats = await fetchBoats();
        const foundBoat = boats.find(b => b.id === id);
        
        if (foundBoat) {
          setBoat(foundBoat);
        }
      } catch (error) {
        console.error('Error loading boat:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      loadBoat();
    }
  }, [id]);

  const handlePrevImage = () => {
    if (!boat) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? boat.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    if (!boat) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === boat.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900">
        <Navbar />
        
        {/* Persistent SearchBar */}
        <div className="pt-24 px-4 bg-indigo-900">
          <SearchBar compact={true} />
        </div>
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-indigo-800/40 rounded-xl mb-8"></div>
            <div className="h-8 bg-indigo-800/40 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-indigo-800/40 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="h-4 bg-indigo-800/40 rounded w-full mb-3"></div>
                <div className="h-4 bg-indigo-800/40 rounded w-full mb-3"></div>
                <div className="h-4 bg-indigo-800/40 rounded w-3/4 mb-6"></div>
                <div className="h-6 bg-indigo-800/40 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="h-10 bg-indigo-800/40 rounded"></div>
                  <div className="h-10 bg-indigo-800/40 rounded"></div>
                </div>
              </div>
              <div className="bg-indigo-800/40 rounded-xl h-64"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!boat) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900">
        <Navbar />
        
        {/* Persistent SearchBar */}
        <div className="pt-24 px-4 bg-indigo-900">
          <SearchBar compact={true} />
        </div>
        
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Boat Not Found</h1>
          <p className="text-blue-200 mb-8">The boat you're looking for doesn't exist or has been removed.</p>
          <Link to="/boats">
            <Button className="bg-red-500 hover:bg-red-600">
              Browse All Boats
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const totalPrice = boat.price_per_hour * duration;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      <Navbar />
      
      {/* Persistent SearchBar */}
      <div className="pt-24 px-4 bg-indigo-900">
        <SearchBar compact={true} />
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link to="/boats" className="text-blue-300 hover:text-blue-100 flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to all boats
          </Link>
        </div>
        
        {/* Image Gallery */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <img 
            src={boat.images[currentImageIndex]} 
            alt={boat.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="container p-6">
              <div className="flex justify-between items-end">
                <div>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {boat.type}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{boat.name}</h1>
                  <div className="flex items-center gap-2 text-blue-200 mt-2">
                    <MapPin className="h-4 w-4" />
                    <span>{boat.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-black/30 border-gray-400 text-white hover:bg-black/50" 
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-black/30 border-gray-400 text-white hover:bg-black/50" 
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Boat Details */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-6 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-300" />
                <span>Up to {boat.capacity} guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-blue-300" />
                <span>{boat.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>{boat.rating} / 5 ({Math.floor(Math.random() * 30) + 5} reviews)</span>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">About This Boat</h2>
            <p className="text-blue-100 mb-8">{boat.description}</p>
            
            <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {boat.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Anchor className="h-4 w-4 text-blue-300" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Booking Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg h-fit sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-2xl font-bold">฿{boat.price_per_hour.toLocaleString()}</span>
                <span className="text-blue-200"> / hour</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="font-medium">{boat.rating}</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-1">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="date" 
                    className="w-full pl-10 py-2 bg-white/10 border border-gray-400/30 rounded-lg text-white"
                    onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Guests</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                  <select 
                    className="w-full pl-10 py-2 bg-white/10 border border-gray-400/30 rounded-lg text-white"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  >
                    {[...Array(boat.capacity)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Duration (hours)</label>
                <div className="flex gap-2">
                  {[2, 4, 6, 8].map((hours) => (
                    <button
                      key={hours}
                      className={`flex-1 py-2 rounded-lg border ${
                        duration === hours
                          ? 'bg-red-500 border-red-600 text-white'
                          : 'bg-white/10 border-gray-400/30 text-white'
                      }`}
                      onClick={() => setDuration(hours)}
                    >
                      {hours}h
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200/20 pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>฿{boat.price_per_hour.toLocaleString()} × {duration} hours</span>
                <span>฿{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>฿{totalPrice.toLocaleString()}</span>
              </div>
            </div>
            
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-3">
              Reserve Now
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BoatDetail;
