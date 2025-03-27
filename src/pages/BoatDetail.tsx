import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getBoatById, Boat } from '@/data/boats';
import { Star, MapPin, Heart, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BoatDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(2);
  const [guestCount, setGuestCount] = useState<number>(2);
  
  useEffect(() => {
    if (id) {
      // Simulate API loading delay
      const timer = setTimeout(() => {
        const boatData = getBoatById(id);
        if (boatData) {
          // Ensure the boat has at least 3 images
          const updatedBoat = {
            ...boatData,
            images: boatData.images.length >= 3 ? boatData.images : [
              "https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=2048&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
            ],
            price: boatData.price * 35 // Convert to Thai Baht
          };
          setBoat(updatedBoat);
        }
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [id]);
  
  const handlePrevImage = () => {
    if (!boat) return;
    setActiveImageIndex((prev) => (prev === 0 ? boat.images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    if (!boat) return;
    setActiveImageIndex((prev) => (prev === boat.images.length - 1 ? 0 : prev + 1));
  };

  const handleCheckout = () => {
    if (!selectedDate || !startTime) {
      alert('Please select a date and time to continue');
      return;
    }
    // Navigate to checkout page with booking details
    navigate('/checkout', { 
      state: { 
        boatId: id,
        boatName: boat?.name,
        boatImage: boat?.images[0],
        date: selectedDate,
        time: startTime,
        duration,
        guestCount,
        price: boat?.price,
        totalPrice: boat ? (boat.price * duration) + 50 + 30 : 0
      } 
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-36 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!boat) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Boat Not Found</h2>
            <p className="text-gray-600 mb-6">The boat you're looking for doesn't exist or has been removed.</p>
            <Link to="/boats">
              <Button variant="default" className="bg-ocean-600 hover:bg-ocean-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Boats
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const totalPrice = boat.price * duration;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link to="/boats" className="inline-flex items-center gap-1 text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to results</span>
          </Link>
          
          {/* Boat Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">{boat.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{boat.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-200">
                  <MapPin className="h-4 w-4" />
                  <span>{boat.location}</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className={`flex items-center gap-2 border-blue-400 ${isFavorite ? 'text-red-500' : 'text-white'}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </Button>
          </div>
          
          {/* Image Gallery */}
          <div className="relative mb-10 rounded-2xl overflow-hidden shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img 
                src={boat.images[activeImageIndex]} 
                alt={`${boat.name} - Image ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-500 ease-in-out"
              />
              
              {/* Navigation arrows */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full p-2 transition-colors"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full p-2 transition-colors"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Image count indicator */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {activeImageIndex + 1} / {boat.images.length}
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-2 mt-2 px-2">
              {boat.images.map((image, index) => (
                <button 
                  key={index}
                  className={`flex-1 max-w-[120px] aspect-video rounded-lg overflow-hidden transition-all ${activeImageIndex === index ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${boat.name} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Simplified Boat Details */}
            <div className="lg:col-span-2">
              <div className="bg-indigo-800/40 rounded-xl shadow-sm p-6 mb-8 border border-purple-700/30">
                <h2 className="text-xl font-semibold text-white mb-4">{boat.type}</h2>
                <p className="text-blue-200 mb-6">{boat.description}</p>
              </div>
            </div>
            
            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-indigo-800/40 rounded-xl shadow-md p-6 sticky top-24 border border-purple-700/30">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-2xl font-bold text-white">฿{boat.price}</span>
                    <span className="text-blue-200">/hour</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{boat.rating}</span>
                  </div>
                </div>
                
                <form className="space-y-4">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Date</label>
                    <input 
                      type="date" 
                      className="w-full pl-3 pr-3 py-2 bg-indigo-700/50 border border-purple-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-white"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  
                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Start Time</label>
                    <select 
                      className="w-full pl-3 pr-3 py-2 bg-indigo-700/50 border border-purple-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all appearance-none text-white"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      <option value="">Select a time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                  
                  {/* Duration Selection */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Duration (hours)</label>
                    <div className="flex items-center justify-between bg-indigo-700/50 border border-purple-700/50 rounded-lg">
                      <button 
                        type="button"
                        className="px-3 py-2 text-blue-200 hover:text-white transition-colors"
                        onClick={() => setDuration(Math.max(1, duration - 1))}
                      >
                        -
                      </button>
                      <span className="font-medium text-white">{duration} {duration === 1 ? 'hour' : 'hours'}</span>
                      <button 
                        type="button"
                        className="px-3 py-2 text-blue-200 hover:text-white transition-colors"
                        onClick={() => setDuration(Math.min(10, duration + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Price Calculation */}
                  <div className="border-t border-purple-700/30 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-blue-200">฿{boat.price} × {duration} hours</span>
                      <span className="font-medium text-white">฿{boat.price * duration}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-blue-200">Service fee</span>
                      <span className="font-medium text-white">฿30</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-purple-700/30 pt-3 mt-3">
                      <span className="text-white">Total</span>
                      <span className="text-white">฿{totalPrice + 30}</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-all"
                    onClick={handleCheckout}
                  >
                    Book Now
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BoatDetailPage;
