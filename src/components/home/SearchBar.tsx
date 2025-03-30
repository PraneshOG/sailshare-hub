
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

  // Function to get random price level class for a date
  const getPriceLevelClass = (date: Date) => {
    // Use the date to deterministically generate a price level (based on day of month)
    const day = date.getDate();
    
    if (day % 3 === 0) {
      return "bg-[#F2FCE2] hover:bg-[#E5F6C5] text-emerald-800"; // Low price
    } else if (day % 3 === 1) {
      return "bg-[#FEF7CD] hover:bg-[#F9EDB5] text-amber-800"; // Medium price
    } else {
      return "bg-[#FEC6A1] hover:bg-[#F9B58A] text-orange-800"; // High price
    }
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
                      low: (date) => date.getDate() % 3 === 0,
                      medium: (date) => date.getDate() % 3 === 1,
                      high: (date) => date.getDate() % 3 === 2
                    }}
                    modifiersClassNames={{
                      low: "bg-green-100 border border-green-300 font-medium",
                      medium: "bg-amber-100 border border-amber-300 font-medium",
                      high: "bg-red-100 border border-red-300 font-medium"
                    }}
                    classNames={{
                      day_selected: "bg-ocean-600 text-white hover:bg-ocean-500 hover:text-white focus:bg-ocean-600 focus:text-white",
                      day_today: "text-ocean-800 font-bold ring-2 ring-ocean-500",
                      day: "hover:bg-ocean-100 hover:text-ocean-800 text-sm aria-selected:opacity-100",
                      head_cell: "text-ocean-600 font-semibold",
                      caption: "text-ocean-800 font-medium",
                      nav_button: "border border-ocean-200 bg-white hover:bg-ocean-50",
                      table: "border-collapse space-y-1",
                      cell: "p-0 relative [&:has([aria-selected])]:bg-ocean-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      row: "flex w-full mt-2",
                      head_row: "flex",
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                    }}
                  />
                  {/* Price Legend */}
                  <div className="p-3 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Price Legend:</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-green-100 border border-green-300 mr-1.5"></div>
                        <span className="text-xs text-gray-600">Low</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-amber-100 border border-amber-300 mr-1.5"></div>
                        <span className="text-xs text-gray-600">Medium</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-red-100 border border-red-300 mr-1.5"></div>
                        <span className="text-xs text-gray-600">High</span>
                      </div>
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
