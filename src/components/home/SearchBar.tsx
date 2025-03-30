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

  const priceTiers = ["low", "medium", "high"];

  // Function to get price levels for dates
  const getPriceTiers = (date: Date) => {
    if (date.getDate() % 3 === 0) {
      return "low";
    } else if (date.getDate() % 3 === 1) {
      return "medium";
    } else {
      return "high";
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (date) params.append('date', format(date, 'yyyy-MM-dd'));
    if (guests) params.append('guests', guests);

    navigate(`/boats?${params.toString()}`);
  };

  const tierColors = {
    low: "#F8CB45",
    medium: "#F8CB45",
    high: "#8A3FFC",
  };

  const getUniquePriceTiers = (month: Date) => {
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const uniqueTiers = new Set<string>();

    for (let i = 1; i <= daysInMonth; i++) {
      uniqueTiers.add(getPriceTiers(new Date(month.getFullYear(), month.getMonth(), i)));
    }

    return Array.from(uniqueTiers);
  };

  const [uniquePriceTiers, setUniquePriceTiers] = useState<string[]>([]);

  const handleMonthChange = (month: Date) => {
    setUniquePriceTiers(getUniquePriceTiers(month));
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
                    onMonthChange={handleMonthChange}
                    classNames={{
                      day: (date) => {
                        const tier = getPriceTiers(date);
                        let colorClass = '';
                        if (tier === 'low') colorClass = 'bg-[#F8CB45] text-black font-medium rounded-md';
                        if (tier === 'medium') colorClass = 'bg-[#F8CB45] text-black font-medium rounded-md';
                        if (tier === 'high') colorClass = 'bg-[#8A3FFC] text-white font-medium rounded-md';

                        return cn(
                          "h-10 w-10 p-0 font-normal flex items-center justify-center rounded-md aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
                          colorClass
                        );
                      },
                      day_selected: "bg-ocean-600 text-white hover:bg-ocean-500 hover:text-white focus:bg-ocean-600 focus:text-white",
                      day_today: "font-bold border-2 border-ocean-600",
                    }}
                  />
                  {/* Price Legend */}
                  <div className="p-3 border-t border-gray-200 flex items-center justify-between">
                    {Object.entries(tierColors).map(([tier, color]) => (
                      <div key={tier} className={`flex items-center px-2 py-1 bg-[${color}]/20 rounded`}>
                        <span className="text-xs">₹{Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000}+</span>
                      </div>
                    ))}
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
