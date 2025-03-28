
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRightLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchBarProps {
  compact?: boolean;
}

const SearchBar = ({ compact = false }: SearchBarProps) => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [tripType, setTripType] = useState('round-trip');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState('1 adult, Economy');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.append('from', searchLocation);
    if (searchDestination) params.append('to', searchDestination);
    if (departureDate) params.append('departure', format(departureDate, 'yyyy-MM-dd'));
    if (returnDate && tripType === 'round-trip') params.append('return', format(returnDate, 'yyyy-MM-dd'));
    params.append('tripType', tripType);
    params.append('passengers', passengers);
    
    navigate(`/boats?${params.toString()}`);
  };

  const swapLocations = () => {
    const tempLocation = searchLocation;
    setSearchLocation(searchDestination);
    setSearchDestination(tempLocation);
  };

  return (
    <div className={`bg-indigo-900/90 backdrop-blur-md rounded-xl ${compact ? 'p-2' : 'p-3'} shadow-lg max-w-4xl mx-auto`}>
      <Tabs defaultValue="round-trip" onValueChange={setTripType} className="space-y-2">
        <TabsList className="bg-indigo-800 h-8">
          <TabsTrigger value="round-trip" className="text-xs data-[state=active]:bg-red-500 h-6 px-2">Round trip</TabsTrigger>
          <TabsTrigger value="one-way" className="text-xs data-[state=active]:bg-red-500 h-6 px-2">One way</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 gap-2">
          {/* Row 1: Origin/Destination */}
          <div className="grid grid-cols-12 gap-1">
            {/* Origin */}
            <div className="col-span-5 bg-white rounded-lg relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <MapPin className="h-3 w-3 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="w-full pl-6 pr-2 py-1.5 border-0 rounded-lg focus:ring-0 text-xs"
                placeholder="From where?"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            
            {/* Swap button */}
            <div className="col-span-2 flex justify-center items-center">
              <button 
                className="bg-red-500 rounded-full p-1"
                onClick={swapLocations}
              >
                <ArrowRightLeft className="h-3 w-3 text-white" />
              </button>
            </div>
            
            {/* Destination */}
            <div className="col-span-5 bg-white rounded-lg relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <MapPin className="h-3 w-3 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="w-full pl-6 pr-2 py-1.5 border-0 rounded-lg focus:ring-0 text-xs"
                placeholder="To where?"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
              />
            </div>
          </div>
          
          {/* Row 2: Date Selection, Passengers, Search Button */}
          <div className="grid grid-cols-12 gap-1">
            {/* Departure Date */}
            <div className="col-span-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white rounded-lg w-full flex justify-start font-normal border-0 text-xs h-7"
                  >
                    <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="truncate">
                      {departureDate ? format(departureDate, 'dd MMM yyyy') : 'Departure'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                    className="p-2 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date - Only show if round-trip is selected */}
            <div className="col-span-3">
              {tripType === 'round-trip' ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="bg-white rounded-lg w-full flex justify-start font-normal border-0 text-xs h-7"
                    >
                      <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="truncate">
                        {returnDate ? format(returnDate, 'dd MMM yyyy') : 'Return'}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={date => !departureDate || date < departureDate}
                      className="p-2 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="bg-white rounded-lg h-7 opacity-50 flex items-center px-2">
                  <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-400">One way</span>
                </div>
              )}
            </div>
            
            {/* Passenger Selection */}
            <div className="col-span-3 bg-white rounded-lg relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <Users className="h-3 w-3 text-gray-400" />
              </div>
              <select 
                className="w-full pl-6 pr-1 py-1 border-0 rounded-lg focus:ring-0 appearance-none bg-white text-xs h-7"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
              >
                <option value="1 adult, Economy">1 adult</option>
                <option value="2 adults, Economy">2 adults</option>
                <option value="1 adult, Business">1 adult, Business</option>
                <option value="2 adults, Business">2 adults, Business</option>
              </select>
            </div>
            
            {/* Search Button */}
            <div className="col-span-2">
              <Button 
                onClick={handleSearch}
                className="bg-red-500 hover:bg-red-600 text-xs h-7 w-full rounded-lg"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SearchBar;
