
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Users, MapPin, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  
  return (
    <section className="relative h-screen min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=2070&auto=format&fit=crop" 
          alt="Beautiful beach in Phuket, Thailand" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-900/40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Where do you want to go?
          </h1>
          
          {/* Search Box - Redesigned to match screenshot */}
          <div className="bg-indigo-900/90 backdrop-blur-md rounded-xl p-6 shadow-lg max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Tabs */}
            <div className="flex mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-red-500 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="text-white font-medium">Boats</span>
              </div>
              <div className="flex items-center gap-2 ml-8">
                <div className="bg-indigo-800/50 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 11a9 9 0 0 1 9 9"></path>
                    <path d="M4 4a16 16 0 0 1 16 16"></path>
                    <circle cx="5" cy="19" r="1"></circle>
                  </svg>
                </div>
                <span className="text-white/70 font-medium">Stays</span>
              </div>
              <div className="flex items-center gap-2 ml-8">
                <div className="bg-indigo-800/50 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <span className="text-white/70 font-medium">Car Hire</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Origin/Destination */}
              <div className="bg-white rounded-lg flex items-center">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-10 pr-3 py-3 border-0 rounded-l-lg focus:ring-0"
                    placeholder="From where?"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                
                <div className="px-2">
                  <div className="bg-red-500 rounded-full p-2">
                    <ArrowLeftRight className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-10 pr-3 py-3 border-0 rounded-r-lg focus:ring-0"
                    placeholder="To where?"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Date & Guest Selection */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white rounded-lg relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex">
                    <input 
                      type="text" 
                      className="w-1/2 pl-10 pr-3 py-3 border-0 rounded-l-lg focus:ring-0"
                      placeholder="Departure"
                      readOnly
                      onClick={() => console.log('Open date picker')}
                    />
                    <span className="flex items-center justify-center text-gray-300 px-2">—</span>
                    <input 
                      type="text" 
                      className="w-1/2 pr-3 py-3 border-0 rounded-r-lg focus:ring-0"
                      placeholder="Return"
                      readOnly
                      onClick={() => console.log('Open date picker')}
                    />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <select 
                    className="w-full pl-10 pr-3 py-3 border-0 rounded-lg focus:ring-0 appearance-none bg-white"
                  >
                    <option value="">1 adult, Economy</option>
                    <option value="1-2">2 adults, Economy</option>
                    <option value="3-6">1 adult, Business</option>
                    <option value="7-10">2 adults, Business</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Link to={`/boats${searchLocation ? `?location=${encodeURIComponent(searchLocation)}` : ''}`}>
                <Button className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2 text-lg">
                  <Search className="h-5 w-5" />
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
