
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState('');

  // Function to get price levels for dates
  const getPriceTiers = (day: number) => {
    // Low price days (green)
    if ([2, 3, 4, 5, 30, 31].includes(day)) {
      return "low";
    } 
    // Medium price days (amber)
    else if ([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28].includes(day)) {
      return "medium";
    } 
    // High price days (purple)
    else if ([1, 22, 29].includes(day)) {
      return "high";
    }
    return "";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (date) params.append('date', format(date, 'yyyy-MM-dd'));
    if (guests) params.append('guests', guests);
    
    navigate(`/boats?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto p-4 -mt-10 relative z-20">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all"
              placeholder="Where to?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn(
                  "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all justify-start",
                  !date && "text-muted-foreground"
                )}>
                  <Calendar className="h-5 w-5 text-gray-400 absolute left-3" />
                  {date ? format(date, 'PP') : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div>
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    modifiers={{
                      low: (date) => ["low"].includes(getPriceTiers(date.getDate())),
                      medium: (date) => ["medium"].includes(getPriceTiers(date.getDate())),
                      high: (date) => ["high"].includes(getPriceTiers(date.getDate()))
                    }}
                    modifiersClassNames={{
                      low: "bg-[#12B981]/20 border-0 text-black font-medium",
                      medium: "bg-[#F8CB45]/20 border-0 text-black font-medium",
                      high: "bg-[#8A3FFC] border-0 text-white font-medium"
                    }}
                    classNames={{
                      day_selected: "bg-ocean-600 text-white hover:bg-ocean-500 hover:text-white focus:bg-ocean-600 focus:text-white",
                      day_today: "font-bold border-2 border-ocean-600",
                      day: "hover:bg-ocean-100 hover:text-ocean-800 text-sm aria-selected:opacity-100 w-10 h-10 p-0 flex items-center justify-center rounded-none",
                      head_cell: "text-gray-600 font-medium text-center w-10",
                      caption: "text-lg font-medium py-2",
                      nav_button: "border border-gray-200 bg-white hover:bg-gray-50",
                      table: "border-collapse space-y-1",
                      cell: "p-0 relative [&:has([aria-selected])]:bg-ocean-50 focus-within:relative focus-within:z-20 w-10 h-10",
                      row: "flex w-full mt-0",
                      head_row: "flex",
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-2",
                    }}
                  />
                  {/* Price Legend */}
                  <div className="p-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center px-2 py-1 bg-[#12B981]/20 rounded">
                      <span className="text-xs">₹12481+</span>
                    </div>
                    <div className="flex items-center px-2 py-1 bg-[#F8CB45]/20 rounded">
                      <span className="text-xs">₹16133+</span>
                    </div>
                    <div className="flex items-center px-2 py-1 bg-[#FF6B6B]/20 rounded">
                      <span className="text-xs">₹23954+</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <select 
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all appearance-none bg-white"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="">Guests</option>
              <option value="1-2">1-2 guests</option>
              <option value="3-6">3-6 guests</option>
              <option value="7-10">7-10 guests</option>
              <option value="11+">11+ guests</option>
            </select>
          </div>
          
          <Button 
            type="submit" 
            className="bg-ocean-600 hover:bg-ocean-700 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
