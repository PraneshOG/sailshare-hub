
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
    <div className={`bg-indigo-900/90 backdrop-blur-md rounded-xl ${compact ? 'p-2' : 'p-4'} shadow-lg max-w-4xl mx-auto`}>
      <Tabs defaultValue="round-trip" onValueChange={setTripType}>
        <TabsList className="mb-2 bg-indigo-800">
          <TabsTrigger value="round-trip" className="data-[state=active]:bg-red-500">Round trip</TabsTrigger>
          <TabsTrigger value="one-way" className="data-[state=active]:bg-red-500">One way</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 gap-2">
          {/* Origin/Destination */}
          <div className="bg-white rounded-lg flex items-center">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="w-full pl-8 pr-3 py-2 border-0 rounded-l-lg focus:ring-0 text-sm"
                placeholder="From where?"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            
            <div className="px-1">
              <button 
                className="bg-red-500 rounded-full p-1"
                onClick={swapLocations}
              >
                <ArrowRightLeft className="h-3 w-3 text-white" />
              </button>
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="w-full pl-8 pr-3 py-2 border-0 rounded-r-lg focus:ring-0 text-sm"
                placeholder="To where?"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
              />
            </div>
          </div>
          
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-white rounded-lg relative w-full flex justify-start font-normal border-0 text-sm h-10"
                >
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="pl-8 text-sm">
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

            {tripType === 'round-trip' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white rounded-lg relative w-full flex justify-start font-normal border-0 text-sm h-10"
                  >
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <span className="pl-8 text-sm">
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
            )}
          </div>
          
          {/* Passenger Selection */}
          <div className="bg-white rounded-lg relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <select 
              className="w-full pl-8 pr-3 py-2 border-0 rounded-lg focus:ring-0 appearance-none bg-white text-sm"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            >
              <option value="1 adult, Economy">1 adult, Economy</option>
              <option value="2 adults, Economy">2 adults, Economy</option>
              <option value="1 adult, Business">1 adult, Business</option>
              <option value="2 adults, Business">2 adults, Business</option>
            </select>
          </div>
        </div>
        
        <div className="mt-2 flex justify-end">
          <Button 
            onClick={handleSearch} 
            className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-lg transition-all text-sm"
          >
            Search
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

export default SearchBar;
