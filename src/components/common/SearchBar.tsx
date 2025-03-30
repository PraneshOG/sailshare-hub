
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Users, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addMonths, isValid } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

interface SearchBarProps {
  compact?: boolean;
  hideOnNonHomePage?: boolean;
  onSearch?: (searchData: any) => void;
}

const SearchBar = ({ compact = false, hideOnNonHomePage = false, onSearch }: SearchBarProps) => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [tripType, setTripType] = useState('round-trip');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [cabinClass, setCabinClass] = useState('economy');
  
  // Multiple passenger types with counts
  const [passengers, setPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
    senior: 0,
    student: 0
  });

  // Mock data for calendar price indicators
  const priceTiers = {
    low: [1, 5, 6, 12, 13, 18, 25],  // Low price days (green)
    medium: [2, 7, 8, 14, 19, 20, 26, 27],   // Medium price days (amber)
    high: [3, 4, 9, 10, 11, 15, 16, 21, 22] // High price days (red)
  };

  const handleSearch = () => {
    // Create a more structured passenger object
    const passengersData = Object.entries(passengers)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({ type, count }));

    const searchData = {
      from: searchLocation,
      to: searchDestination,
      departure: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
      return: returnDate && tripType === 'round-trip' ? format(returnDate, 'yyyy-MM-dd') : '',
      tripType,
      passengers: passengersData,
      cabinClass
    };

    if (onSearch) {
      onSearch(searchData);
      return;
    }
    
    // Build query parameters
    const params = new URLSearchParams();
    if (searchLocation) params.append('from', searchLocation);
    if (searchDestination) params.append('to', searchDestination);
    if (departureDate && isValid(departureDate)) params.append('departure', format(departureDate, 'yyyy-MM-dd'));
    if (returnDate && tripType === 'round-trip' && isValid(returnDate)) params.append('return', format(returnDate, 'yyyy-MM-dd'));
    params.append('tripType', tripType);
    params.append('cabinClass', cabinClass);
    params.append('passengers', JSON.stringify(passengersData));
    
    navigate(`/search-results?${params.toString()}`);
  };

  // Handle passenger count changes
  const updatePassengerCount = (type: keyof typeof passengers, change: number) => {
    setPassengers(prev => {
      const newCount = Math.max(0, prev[type] + change);
      // Adults must be at least 1
      if (type === 'adult' && newCount === 0) return prev;
      
      return {
        ...prev,
        [type]: newCount
      };
    });
  };

  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Custom component for the calendar header with month navigation
  const CalendarHeader = ({ currentMonth }: { currentMonth: Date }) => {
    const nextMonth = addMonths(currentMonth, 1);
    
    return (
      <div className="flex justify-between items-center mb-4 px-2">
        <button onClick={goToPreviousMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="grid grid-cols-2 flex-grow text-center">
          <div className="text-sm font-medium">
            {format(currentMonth, 'MMMM yyyy')}
          </div>
          <div className="text-sm font-medium">
            {format(nextMonth, 'MMMM yyyy')}
          </div>
        </div>
        
        <button onClick={goToNextMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  };

  // Get price tier for a day
  const getDayPriceTier = (date: Date) => {
    const day = date.getDate();
    if (priceTiers.low.includes(day)) return 'low';
    if (priceTiers.medium.includes(day)) return 'medium';
    if (priceTiers.high.includes(day)) return 'high';
    return 'normal';
  };

  // Custom dual-month calendar component
  const DualMonthCalendar = ({ selectedDate, onDateSelect, calendarType }: { 
    selectedDate: Date | undefined, 
    onDateSelect: (date: Date | undefined) => void,
    calendarType: 'departure' | 'return'
  }) => {
    const nextMonth = addMonths(currentMonth, 1);
    
    const handleDayClick = (day: Date) => {
      // If selecting return date and it's before departure date, don't allow
      if (calendarType === 'return' && departureDate && day < departureDate) {
        return;
      }
      
      // If selecting departure date and it's after return date, clear return date
      if (calendarType === 'departure' && returnDate && day > returnDate) {
        setReturnDate(undefined);
      }
      
      onDateSelect(day);
    };

    return (
      <div className="p-2 bg-white">
        <CalendarHeader currentMonth={currentMonth} />
        
        {/* Price indicator legend inside the calendar */}
        <div className="flex justify-between mb-2 px-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100"></div>
            <span className="text-xs">฿1,000</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-100"></div>
            <span className="text-xs">฿1,500</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-100"></div>
            <span className="text-xs">฿2,000</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* First Month */}
          <div>
            <div className="grid grid-cols-7 text-center mb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-xs font-medium text-gray-500">{day}</div>
              ))}
            </div>
            
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDayClick}
              month={currentMonth}
              showOutsideDays={false}
              className="pointer-events-auto"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </div>
          
          {/* Second Month */}
          <div>
            <div className="grid grid-cols-7 text-center mb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-xs font-medium text-gray-500">{day}</div>
              ))}
            </div>
            
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDayClick}
              month={nextMonth}
              showOutsideDays={false}
              className="pointer-events-auto"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          {calendarType === 'departure' ? 'Select your departure date' : 'Select your return date'}
        </div>
      </div>
    );
  };

  // Calculate total passengers
  const totalPassengers = Object.values(passengers).reduce((sum, count) => sum + count, 0);

  return (
    <div className={`bg-white rounded-xl shadow-lg max-w-4xl mx-auto p-4 border border-gray-200`}>
      <Tabs defaultValue="round-trip" onValueChange={setTripType} className="space-y-2">
        <TabsList className="bg-gray-100 h-8">
          <TabsTrigger value="round-trip" className="text-xs data-[state=active]:bg-red-500 h-6 px-2">Round trip</TabsTrigger>
          <TabsTrigger value="one-way" className="text-xs data-[state=active]:bg-red-500 h-6 px-2">One way</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 gap-2">
          {/* Single row for all inputs */}
          <div className="grid grid-cols-12 gap-2 items-center">
            {/* From */}
            <div className="col-span-2 relative">
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
            
            {/* To */}
            <div className="col-span-2 relative">
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
            
            {/* Departure Date */}
            <div className="col-span-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white w-full h-8 flex justify-start font-normal border text-xs"
                  >
                    <CalendarIcon className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="truncate">
                      {departureDate && isValid(departureDate) ? format(departureDate, 'dd MMM') : 'Departure'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[600px] p-0" align="start">
                  <DualMonthCalendar 
                    selectedDate={departureDate} 
                    onDateSelect={setDepartureDate}
                    calendarType="departure"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date - Only show if round-trip is selected */}
            <div className="col-span-2">
              {tripType === 'round-trip' ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="bg-white w-full h-8 flex justify-start font-normal border text-xs"
                    >
                      <CalendarIcon className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="truncate">
                        {returnDate && isValid(returnDate) ? format(returnDate, 'dd MMM') : 'Return'}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[600px] p-0" align="start">
                    <DualMonthCalendar 
                      selectedDate={returnDate} 
                      onDateSelect={setReturnDate}
                      calendarType="return"
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="bg-gray-100 rounded-lg h-8 flex items-center px-2 text-gray-400">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span className="text-xs">One way</span>
                </div>
              )}
            </div>
            
            {/* Passenger Selection */}
            <div className="col-span-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white w-full h-8 flex justify-start font-normal border text-xs"
                  >
                    <Users className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="truncate">
                      {totalPassengers} Passenger{totalPassengers !== 1 ? 's' : ''}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 p-3 bg-white mt-1" side="bottom" align="start">
                  <div className="space-y-3">
                    <div className="text-sm font-medium mb-2">Passengers</div>
                    
                    {/* Adult passengers */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">Adults</p>
                        <p className="text-xs text-gray-500">Age 18+</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updatePassengerCount('adult', -1)}
                          disabled={passengers.adult <= 1} // At least 1 adult required
                        >
                          -
                        </Button>
                        <span className="w-5 text-center">{passengers.adult}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updatePassengerCount('adult', 1)}
                          disabled={passengers.adult >= 9}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    {/* Child passengers */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">Children</p>
                        <p className="text-xs text-gray-500">Age 2-17</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updatePassengerCount('child', -1)}
                          disabled={passengers.child <= 0}
                        >
                          -
                        </Button>
                        <span className="w-5 text-center">{passengers.child}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updatePassengerCount('child', 1)}
                          disabled={passengers.child >= 9}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    {/* Infant passengers */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">Infants</p>
                        <p className="text-xs text-gray-500">Under 2</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updatePassengerCount('infant', -1)}
                          disabled={passengers.infant <= 0}
                        >
                          -
                        </Button>
                        <span className="w-5 text-center">{passengers.infant}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updatePassengerCount('infant', 1)}
                          disabled={passengers.infant >= 4}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    {/* Senior passengers */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">Seniors</p>
                        <p className="text-xs text-gray-500">Age 65+</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updatePassengerCount('senior', -1)}
                          disabled={passengers.senior <= 0}
                        >
                          -
                        </Button>
                        <span className="w-5 text-center">{passengers.senior}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updatePassengerCount('senior', 1)}
                          disabled={passengers.senior >= 9}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    {/* Student passengers */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">Students</p>
                        <p className="text-xs text-gray-500">Valid ID required</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updatePassengerCount('student', -1)}
                          disabled={passengers.student <= 0}
                        >
                          -
                        </Button>
                        <span className="w-5 text-center">{passengers.student}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => updatePassengerCount('student', 1)}
                          disabled={passengers.student >= 9}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-sm font-medium mb-2">Cabin Class</div>
                      <RadioGroup 
                        defaultValue={cabinClass}
                        className="flex flex-col gap-2"
                        onValueChange={setCabinClass}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="economy" id="economy" />
                          <Label htmlFor="economy">Economy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="premium" id="premium" />
                          <Label htmlFor="premium">Premium Economy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="business" id="business" />
                          <Label htmlFor="business">Business Class</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="first" id="first" />
                          <Label htmlFor="first">First Class</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Search Button */}
            <div className="col-span-2">
              <Button 
                onClick={handleSearch}
                className="bg-red-500 hover:bg-red-600 text-white w-full h-8 rounded-lg flex items-center justify-center"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SearchBar;
