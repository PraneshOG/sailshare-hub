
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getBoatById, Boat } from '@/data/boats';
import { Star, MapPin, Users, Ruler, Calendar, Clock, Heart, ArrowLeft, ChevronLeft, ChevronRight, Anchor, Shield, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BoatDetailPage = () => {
  const { id } = useParams<{ id: string }>();
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
          setBoat(boatData);
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
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Boat Not Found</h2>
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
  
  // Calculate Total Price
  const totalPrice = boat.price * duration;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link to="/boats" className="inline-flex items-center gap-1 text-gray-500 hover:text-ocean-600 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to results</span>
          </Link>
          
          {/* Boat Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{boat.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{boat.rating}</span>
                  <span className="text-gray-500">({boat.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{boat.location}</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className={`flex items-center gap-2 ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
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
                  className={`flex-1 max-w-[120px] aspect-video rounded-lg overflow-hidden transition-all ${activeImageIndex === index ? 'ring-2 ring-ocean-500' : 'opacity-70 hover:opacity-100'}`}
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
            {/* Left Column - Boat Details */}
            <div className="lg:col-span-2">
              {/* Boat Overview */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center border-b border-gray-100 pb-6 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{boat.type} by {boat.boatOwner.name}</h2>
                    <div className="flex items-center mt-1">
                      <img 
                        src={boat.boatOwner.image}
                        alt={boat.boatOwner.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div className="text-sm text-gray-600">
                        <p>Owner</p>
                        <p>{boat.boatOwner.responseRate}% response rate</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                        <Users className="h-5 w-5 text-ocean-600 mb-1" />
                        <span className="font-medium">{boat.capacity}</span>
                        <span className="text-gray-500">Guests</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                        <Ruler className="h-5 w-5 text-ocean-600 mb-1" />
                        <span className="font-medium">{boat.length} ft</span>
                        <span className="text-gray-500">Length</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About this boat</h3>
                <p className="text-gray-600 mb-6">{boat.description}</p>
                
                {/* Key Features */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {boat.amenities.slice(0, 6).map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="bg-ocean-50 text-ocean-600 rounded-full p-1.5">
                        <Anchor className="h-4 w-4" />
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
                
                {/* Boat Details */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Boat Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Boat Type</span>
                    <span className="font-medium text-gray-900">{boat.type}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Year</span>
                    <span className="font-medium text-gray-900">{boat.year}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Capacity</span>
                    <span className="font-medium text-gray-900">{boat.capacity} people</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Length</span>
                    <span className="font-medium text-gray-900">{boat.length} feet</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Location</span>
                    <span className="font-medium text-gray-900">{boat.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Safety & Requirements */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-ocean-600" />
                  Safety & Requirements
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Safety Equipment</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <LifeBuoy className="h-4 w-4 text-ocean-500" />
                        <span>Life jackets for all passengers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <LifeBuoy className="h-4 w-4 text-ocean-500" />
                        <span>First aid kit</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <LifeBuoy className="h-4 w-4 text-ocean-500" />
                        <span>Fire extinguisher</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <LifeBuoy className="h-4 w-4 text-ocean-500" />
                        <span>Emergency flares</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Valid ID required for all passengers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Security deposit: ${boat.price * 2}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Minimum age: 21 years</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Boating experience preferred</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${boat.price}</span>
                    <span className="text-gray-600">/hour</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{boat.rating}</span>
                    <span className="text-gray-500">({boat.reviewCount})</span>
                  </div>
                </div>
                
                <form className="space-y-4">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        type="date" 
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select 
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all appearance-none bg-white"
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
                  </div>
                  
                  {/* Duration Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                    <div className="flex items-center justify-between border border-gray-200 rounded-lg">
                      <button 
                        type="button"
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setDuration(Math.max(1, duration - 1))}
                      >
                        -
                      </button>
                      <span className="font-medium">{duration} {duration === 1 ? 'hour' : 'hours'}</span>
                      <button 
                        type="button"
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setDuration(Math.min(10, duration + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Guest Count */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <div className="flex items-center justify-between border border-gray-200 rounded-lg">
                      <button 
                        type="button"
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      >
                        -
                      </button>
                      <span className="font-medium">{guestCount} {guestCount === 1 ? 'guest' : 'guests'}</span>
                      <button 
                        type="button"
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setGuestCount(Math.min(boat.capacity, guestCount + 1))}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Maximum capacity: {boat.capacity} guests</p>
                  </div>
                  
                  {/* Price Calculation */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">${boat.price} × {duration} hours</span>
                      <span className="font-medium">${boat.price * duration}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span className="font-medium">$50</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Service fee</span>
                      <span className="font-medium">$30</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-3 mt-3">
                      <span>Total</span>
                      <span>${totalPrice + 50 + 30}</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button"
                    className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-medium py-3 rounded-lg transition-all"
                    onClick={() => alert('Proceeding to checkout would be the next step')}
                  >
                    Continue to Book
                  </Button>
                </form>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  You won't be charged yet. Final verification required at checkout.
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

export default BoatDetailPage;
