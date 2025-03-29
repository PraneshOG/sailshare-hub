
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MainSidebar from '@/components/layout/MainSidebar';
import { boat } from '@/data/singleBoat';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

const BoatDetail = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [guestCount, setGuestCount] = useState(1);

  const handleBookNow = () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    navigate('/checkout', { 
      state: { 
        boat,
        bookingDetails: {
          date: selectedDate,
          guestCount
        }
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 w-full">
      <Navbar />
      
      <div className="flex flex-1 w-full">
        <MainSidebar />
        
        <main className="flex-grow p-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={boat.images[0]} 
                    alt={boat.name} 
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-1/2">
                  <h1 className="text-3xl font-bold text-gray-800">{boat.name}</h1>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-gray-700">{boat.rating} reviews</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-700">{boat.location}</span>
                  </div>
                  
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800">About this boat</h2>
                    <p className="mt-2 text-gray-600">{boat.description}</p>
                  </div>
                  
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800">Features</h2>
                    <ul className="mt-2 grid grid-cols-2 gap-2">
                      <li className="text-gray-600">Type: {boat.type}</li>
                      <li className="text-gray-600">Capacity: {boat.capacity} people</li>
                      <li className="text-gray-600">Features: {boat.features.length} available</li>
                      <li className="text-gray-600">Location: {boat.location}</li>
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Book Your Trip</h2>
                    
                    <div className="space-y-4">
                      {/* Date Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              className="border rounded-md p-3 pointer-events-auto"
                              classNames={{
                                day_selected: "bg-indigo-600 text-primary-foreground hover:bg-indigo-600",
                                day_today: "bg-indigo-100 text-indigo-900",
                                day_range_middle: "aria-selected:bg-indigo-100 aria-selected:text-indigo-900",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      {/* Guest Count */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {Array.from({ length: boat.capacity }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                        <p className="mt-1 text-sm text-gray-500">Maximum capacity: {boat.capacity} guests</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-gray-800">${boat.price_per_hour}</span>
                        <span className="text-gray-600"> / hour</span>
                      </div>
                      <Button 
                        onClick={handleBookNow}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default BoatDetail;
