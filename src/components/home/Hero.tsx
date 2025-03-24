
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [searchLocation, setSearchLocation] = useState('');
  
  return (
    <section className="relative h-screen min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury boat on beautiful water" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 to-navy-900/40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block bg-ocean-600/90 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-6 animate-fade-in">
            India's Premier Boat Rental Marketplace
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Experience India's Waters<br />
            <span className="text-ocean-400">Like Never Before</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover and book premium boats across India's most beautiful waterways. Perfect for family outings, celebrations, or a peaceful day on the water.
          </p>
          
          {/* Search Box */}
          <div className="bg-white rounded-xl p-4 shadow-lg max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all"
                  placeholder="Where to?"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all"
                  placeholder="When?"
                  readOnly
                  onClick={() => console.log('Open date picker')}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <select 
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="">Guests</option>
                  <option value="1-2">1-2 guests</option>
                  <option value="3-6">3-6 guests</option>
                  <option value="7-10">7-10 guests</option>
                  <option value="11+">11+ guests</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Link to={`/boats${searchLocation ? `?location=${encodeURIComponent(searchLocation)}` : ''}`}>
                <Button className="bg-ocean-600 hover:bg-ocean-700 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Find Boats
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-white">Verified Boat Owners</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-white">Secure Payments</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-white">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <a 
        href="#featured-boats" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 hover:text-white transition-colors"
      >
        <span className="text-sm mb-2">Explore</span>
        <div className="animate-bounce">
          <ArrowRight className="h-5 w-5 transform rotate-90" />
        </div>
      </a>
    </section>
  );
};

export default Hero;
