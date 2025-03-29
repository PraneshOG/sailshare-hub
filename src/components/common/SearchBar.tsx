
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Users, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addMonths } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
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
  const [passengerType, setPassengerType] = useState('Adult');
  const [passengerCount, setPassengerCount] = useState(1);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Mock data for calendar price indicators
  const priceTiers = {
    low: [1, 5, 6, 12, 13, 18, 25],  // Low price days (green)
    medium: [2, 7, 8, 14, 19, 20, 26, 27],   // Medium price days (amber)
    high: [3, 4, 9, 10, 11, 15, 16, 21, 22] // High price days (red)
  };

  const handleSearch = () => {
    const searchData = {
      from: searchLocation,
      to: searchDestination,
      departure: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
      return: returnDate && tripType === 'round-trip' ? format(returnDate, 'yyyy-MM-dd') : '',
      tripType,
      passengers: `${passengerCount} ${passengerType}`
    };

    if (onSearch) {
      onSearch(searchData);
      return;
    }
    
    // Build query parameters
    const params = new URLSearchParams();
    if (searchLocation) params.append('from', searchLocation);
    if (searchDestination) params.append('to', searchDestination);
    if (departureDate) params.append('departure', format(departureDate, 'yyyy-MM-dd'));
    if (returnDate && tripType === 'round-trip') params.append('return', format(returnDate, 'yyyy-MM-dd'));
    params.append('tripType', tripType);
    params.append('passengers', `${passengerCount} ${passengerType}`);
    
    navigate(`/boats?${params.toString()}`);
  };

  const incrementPassenger = () => {
    setPassengerCount(prev => Math.min(prev + 1, 10));
  };

  const decrementPassenger = () => {
    setPassengerCount(prev => Math.max(prev - 1, 1));
  };

  // Function to determine day price tier
  const getDayPriceTier = (date: Date) => {
    const day = date.getDate();
    if (priceTiers.low.includes(day)) return 'low';
    if (priceTiers.medium.includes(day)) return 'medium';
    if (priceTiers.high.includes(day)) return 'high';
    return 'normal';
  };

  // Price indicators for the color-coding legend
  const priceIndicators = {
    low: '฿1,000',
    medium: '฿1,500',
    high: '฿2,000',
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

  // Custom day renderer for dual calendar
  const renderDay = (day: Date, isSecondMonth = false) => {
    const tier = getDayPriceTier(day);
    const isSelected = 
      (departureDate && day.getTime() === departureDate.getTime()) ||
      (returnDate && day.getTime() === returnDate.getTime());
    
    const bgColor = 
      isSelected ? 'bg-purple-600 text-white' : 
      tier === 'low' ? 'bg-green-100' : 
      tier === 'medium' ? 'bg-amber-100' : 
      tier === 'high' ? 'bg-red-100' : 
      'bg-transparent';
    
    return (
      <div 
        className={`relative w-full h-full flex flex-col items-center justify-center rounded-md ${bgColor} hover:bg-opacity-80 cursor-pointer text-sm py-1`}
      >
        <span>{day.getDate()}</span>
        <span className="text-[9px]">
          {tier === 'low' ? priceIndicators.low : 
           tier === 'medium' ? priceIndicators.medium : 
           tier === 'high' ? priceIndicators.high : ''}
        </span>
      </div>
    );
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
              components={{
                Day: ({ date }) => renderDay(date),
              }}
              showOutsideDays={false}
              className="pointer-events-auto"
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
              components={{
                Day: ({ date }) => renderDay(date, true),
              }}
              showOutsideDays={false}
              className="pointer-events-auto"
            />
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          {calendarType === 'departure' ? 'Select your departure date' : 'Select your return date'}
        </div>
      </div>
    );
  };

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
                      {departureDate ? format(departureDate, 'dd MMM') : 'Departure'}
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
                        {returnDate ? format(returnDate, 'dd MMM') : 'Return'}
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
                      {passengerCount} {passengerType}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-3 bg-white">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Passengers</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={decrementPassenger}
                          disabled={passengerCount <= 1}
                        >
                          -
                        </Button>
                        <span className="w-5 text-center">{passengerCount}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={incrementPassenger}
                          disabled={passengerCount >= 10}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-500 mb-1">Passenger Type</div>
                      <DropdownMenuItem 
                        onClick={() => setPassengerType('Adult')}
                        className={`${passengerType === 'Adult' ? 'bg-gray-100' : ''}`}
                      >
                        Adult
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setPassengerType('Youth')}
                        className={`${passengerType === 'Youth' ? 'bg-gray-100' : ''}`}
                      >
                        Youth
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setPassengerType('Student')}
                        className={`${passengerType === 'Student' ? 'bg-gray-100' : ''}`}
                      >
                        Student
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setPassengerType('Other')}
                        className={`${passengerType === 'Other' ? 'bg-gray-100' : ''}`}
                      >
                        Other
                      </DropdownMenuItem>
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

      {/* Price legend below the search form */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="flex items-center justify-center text-xs bg-green-100 py-1 px-2 rounded">
          <span className="font-medium mr-1">Low price:</span> {priceIndicators.low}
        </div>
        <div className="flex items-center justify-center text-xs bg-amber-100 py-1 px-2 rounded">
          <span className="font-medium mr-1">Medium price:</span> {priceIndicators.medium}
        </div>
        <div className="flex items-center justify-center text-xs bg-red-100 py-1 px-2 rounded">
          <span className="font-medium mr-1">High price:</span> {priceIndicators.high}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
