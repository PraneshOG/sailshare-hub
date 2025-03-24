
export interface Boat {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number; // Price per hour
  capacity: number;
  length: number; // Length in feet
  year: number;
  description: string;
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  boatOwner: {
    name: string;
    image: string;
    responseRate: number;
  };
}

export const boats: Boat[] = [
  {
    id: "boat-01",
    name: "Azure Dream",
    type: "Motor Yacht",
    location: "Miami, FL",
    price: 250,
    capacity: 8,
    length: 42,
    year: 2020,
    description: "Experience luxury on the water with this stunning motor yacht. Perfect for day trips or sunset cruises with family and friends.",
    amenities: ["Bluetooth Sound System", "Swimming Platform", "Refrigerator", "Shower", "Sun Deck", "GPS Navigation"],
    images: [
      "https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=1994&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628527304948-06172126f9db?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589974732402-17600e20eef5?q=80&w=1976&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 28,
    featured: true,
    boatOwner: {
      name: "Michael Scott",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
      responseRate: 98
    }
  },
  {
    id: "boat-02",
    name: "Ocean Voyager",
    type: "Sailing Yacht",
    location: "San Diego, CA",
    price: 180,
    capacity: 6,
    length: 38,
    year: 2018,
    description: "Set sail on this beautiful sailing yacht and enjoy the peaceful experience of gliding through the waves powered by the wind.",
    amenities: ["Fully Equipped Galley", "Cabin Berths", "Marine Toilet", "Snorkeling Gear", "Cockpit Cushions", "VHF Radio"],
    images: [
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=2048&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561531051-412ffce1f6af?q=80&w=1972&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=2048&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 19,
    featured: true,
    boatOwner: {
      name: "Emily Johnson",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
      responseRate: 95
    }
  },
  {
    id: "boat-03",
    name: "Coastal Explorer",
    type: "Catamaran",
    location: "Key West, FL",
    price: 320,
    capacity: 12,
    length: 45,
    year: 2021,
    description: "Enjoy the ultimate stability and space of this modern catamaran. Great for larger groups wanting to explore coastal waters in comfort.",
    amenities: ["Spacious Sundeck", "Fresh Water Shower", "Kitchenette", "Bluetooth Speakers", "Snorkeling Equipment", "Cooler"],
    images: [
      "https://images.unsplash.com/photo-1601671086461-18e87b2c1c60?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562163835-b8d5a1bc95a6?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599595344946-cb2a46ba469e?q=80&w=1974&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 34,
    featured: true,
    boatOwner: {
      name: "David Wilson",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
      responseRate: 99
    }
  },
  {
    id: "boat-04",
    name: "Harbor Cruiser",
    type: "Pontoon Boat",
    location: "Chicago, IL",
    price: 120,
    capacity: 10,
    length: 24,
    year: 2019,
    description: "Perfect for a relaxed day on the water. This comfortable pontoon boat is ideal for sightseeing, fishing, or just cruising the harbor.",
    amenities: ["Bimini Top", "Bluetooth Stereo", "Swim Ladder", "Comfortable Seating", "Cooler", "USB Charging"],
    images: [
      "https://images.unsplash.com/photo-1550909051-ea1d7cc14a48?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1636455780323-3bec13c08db2?q=80&w=2074&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 23,
    boatOwner: {
      name: "Sarah Martinez",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      responseRate: 92
    }
  },
  {
    id: "boat-05",
    name: "Wave Rider",
    type: "Speedboat",
    location: "Miami, FL",
    price: 200,
    capacity: 6,
    length: 26,
    year: 2022,
    description: "Feel the thrill of speed on this powerful speedboat. Ideal for watersports enthusiasts or those who just want to feel the wind in their hair.",
    amenities: ["Powerful Engine", "Wakeboard Rack", "Premium Sound System", "GPS Navigation", "Bimini Top", "Swim Platform"],
    images: [
      "https://images.unsplash.com/photo-1615329952697-9e2fa53887bb?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1680200882499-2f43171f0d6e?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532236395709-7d70320fec2d?q=80&w=2002&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 17,
    boatOwner: {
      name: "Alex Thompson",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop",
      responseRate: 97
    }
  },
  {
    id: "boat-06",
    name: "Sunset Serenity",
    type: "Bowrider",
    location: "Tampa, FL",
    price: 150,
    capacity: 8,
    length: 28,
    year: 2020,
    description: "A versatile boat perfect for day cruising, watersports, and making memories on the water with family and friends.",
    amenities: ["Premium Sound System", "Bimini Top", "Swim Platform", "Comfortable Seating", "Storage Space", "Cup Holders"],
    images: [
      "https://images.unsplash.com/photo-1630395822970-acd6a691d97e?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534184241306-2d5103231bad?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622633721992-80f785d4a00c?q=80&w=1942&auto=format&fit=crop"
    ],
    rating: 4.5,
    reviewCount: 21,
    boatOwner: {
      name: "Jessica Brown",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      responseRate: 94
    }
  }
];

export const getBoatById = (id: string): Boat | undefined => {
  return boats.find(boat => boat.id === id);
};

export const getFeaturedBoats = (): Boat[] => {
  return boats.filter(boat => boat.featured);
};

export const getAllBoats = (): Boat[] => {
  return boats;
};
