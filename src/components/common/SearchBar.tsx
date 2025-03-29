
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Search, ArrowRightLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  compact?: boolean;
  hideOnNonHomePage?: boolean;
}

// Passenger type options
type PassengerType = 'Adult' | 'Youth' | 'Student' | 'Other';

interface PassengerCount {
  type: PassengerType;
  count: number;
}

const SearchBar = ({ compact = false, hideOnNonHomePage = false }: SearchBarProps) => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [tripType, setTripType] = useState('round-trip');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  
  // Updated passengers state to handle mixed types
  const [passengers, setPassengers] = useState<PassengerCount[]>([
    { type: 'Adult', count: 1 },
    { type: 'Youth', count: 0 },
    { type: 'Student', count: 0 },
    { type: 'Other', count: 0 }
  ]);

  // Mock data for calendar price indicators
  const priceTiers = {
    low: [1, 5, 6, 12, 13],  // Low price days (green)
    medium: [2, 7, 8, 14],   // Medium price days (amber)
    high: [3, 4, 9, 10, 11]  // High price days (red)
  };

  const handleSearch = () => {
    // Create a map for passenger counts
    const passengerParams = passengers
      .filter(p => p.count > 0)
      .map(p => `${p.count} ${p.type}`)
      .join(', ');
    
    const params = new URLSearchParams();
    if (searchLocation) params.append('from', searchLocation);
    if (searchDestination) params.append('to', searchDestination);
    if (departureDate) params.append('departure', format(departureDate, 'yyyy-MM-dd'));
    if (returnDate && tripType === 'round-trip') params.append('return', format(returnDate, 'yyyy-MM-dd'));
    params.append('tripType', tripType);
    params.append('passengers', passengerParams);
    
    navigate(`/boats?${params.toString()}`);
  };

  const incrementPassenger = (type: PassengerType) => {
    setPassengers(prev => 
      prev.map(p => 
        p.type === type ? { ...p, count: Math.min(p.count + 1, 10) } : p
      )
    );
  };

  const decrementPassenger = (type: PassengerType) => {
    setPassengers(prev => 
      prev.map(p => 
        p.type === type ? { ...p, count: Math.max(p.count - 1, 0) } : p
      )
    );
  };

  // Calculate total passengers
  const totalPassengers = passengers.reduce((sum, p) => sum + p.count, 0);
  
  // Get display text for passenger dropdown
  const getPassengersText = () => {
    if (totalPassengers === 0) return "Select passengers";
    
    const activeTypes = passengers
      .filter(p => p.count > 0)
      .map(p => `${p.count} ${p.type}${p.count !== 1 ? 's' : ''}`)
      .join(', ');
    
    return activeTypes;
  };

  // Function to determine day price tier
  const getDayPriceTier = (date: Date) => {
    const day = date.getDate();
    if (priceTiers.low.includes(day)) return 'low';
    if (priceTiers.medium.includes(day)) return 'medium';
    if (priceTiers.high.includes(day)) return 'high';
    return 'normal';
  };

  // Custom day renderer for the calendar
  const renderDay = (day: Date) => {
    const tier = getDayPriceTier(day);
    return (
      <div className={`relative w-full h-full flex items-center justify-center 
        ${tier === 'low' ? 'bg-green-100' : 
          tier === 'medium' ? 'bg-amber-100' : 
          tier === 'high' ? 'bg-red-100' : ''}`}>
        {day.getDate()}
        <span className="absolute bottom-0 text-[9px] w-full text-center">
          {tier === 'low' ? '฿1,000' : 
           tier === 'medium' ? '฿1,500' : 
           tier === 'high' ? '฿2,000' : ''}
        </span>
      </div>
    );
  };

  // Calculate the end date for the calendar view (2 weeks from today)
  const twoWeeksLater = addDays(new Date(), 14);

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto p-4 border border-gray-200">
      <Tabs defaultValue="round-trip" onValueChange={setTripType} className="space-y-2">
        <div className="flex justify-between items-center">
          <TabsList className="bg-gray-100 h-8">
            <TabsTrigger value="round-trip" className="text-xs data-[state=active]:bg-red-500 h-6 px-2">Round trip</TabsTrigger>
            <TabsTrigger value="one-way" className="text-xs data-[state=active]:bg-red-500 h-6 px-2">One way</TabsTrigger>
          </TabsList>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs"
            onClick={() => {
              const temp = searchLocation;
              setSearchLocation(searchDestination);
              setSearchDestination(temp);
            }}
          >
            <ArrowRightLeft className="h-3 w-3 mr-1" />
            Swap
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Single row for all inputs */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
            {/* From & To combined */}
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <MapPin className="h-3 w-3 text-gray-400" />
                </div>
                <Input 
                  type="text" 
                  className="w-full pl-6 pr-2 py-1.5 text-xs h-8"
                  placeholder="From"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <MapPin className="h-3 w-3 text-gray-400" />
                </div>
                <Input 
                  type="text" 
                  className="w-full pl-6 pr-2 py-1.5 text-xs h-8"
                  placeholder="To"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                />
              </div>
            </div>
            
            {/* Departure & Return Dates */}
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white flex-1 h-8 flex justify-start font-normal border text-xs"
                  >
                    <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="truncate">
                      {departureDate ? format(departureDate, 'dd MMM') : 'Departure'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-2 bg-white">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-100"></div>
                        <span className="text-xs">Low</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-amber-100"></div>
                        <span className="text-xs">Medium</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-100"></div>
                        <span className="text-xs">High</span>
                      </div>
                    </div>
                    <CalendarComponent
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                      components={{ Day: ({ date }) => renderDay(date) }}
                      fromDate={new Date()}
                      toDate={twoWeeksLater}
                      showOutsideDays={false}
                    />
                  </div>
                </PopoverContent>
              </Popover>

              {tripType === 'round-trip' ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="bg-white flex-1 h-8 flex justify-start font-normal border text-xs"
                    >
                      <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="truncate">
                        {returnDate ? format(returnDate, 'dd MMM') : 'Return'}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-2 bg-white">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-100"></div>
                          <span className="text-xs">Low</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-amber-100"></div>
                          <span className="text-xs">Medium</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-red-100"></div>
                          <span className="text-xs">High</span>
                        </div>
                      </div>
                      <CalendarComponent
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                        disabled={date => !departureDate || date < departureDate}
                        className="p-3 pointer-events-auto"
                        components={{ Day: ({ date }) => renderDay(date) }}
                        fromDate={departureDate || new Date()}
                        toDate={twoWeeksLater}
                        showOutsideDays={false}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="bg-gray-100 rounded-lg h-8 flex items-center px-2 text-gray-400 flex-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="text-xs">One way</span>
                </div>
              )}
            </div>
            
            {/* Passenger Selection */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-white h-8 flex justify-start font-normal border text-xs w-40"
                >
                  <Users className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="truncate">
                    {getPassengersText()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-3 bg-white">
                <div className="space-y-3">
                  {passengers.map((passenger) => (
                    <div key={passenger.type} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{passenger.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => decrementPassenger(passenger.type)}
                          disabled={passenger.count <= 0}
                        >
                          -
                        </Button>
                        <span className="w-5 text-center">{passenger.count}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => incrementPassenger(passenger.type)}
                          disabled={passenger.count >= 10}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              className="bg-red-500 hover:bg-red-600 text-white h-8 w-10 rounded-lg flex items-center justify-center"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SearchBar;
