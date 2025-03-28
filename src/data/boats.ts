
export interface Boat {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  capacity: number;
  length: number;
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
    location: "Patong Beach, Phuket",
    price: 250,
    capacity: 8,
    length: 42,
    year: 2020,
    description: "Experience luxury on the water with this stunning motor yacht. Perfect for day trips or sunset cruises with family and friends.",
    amenities: ["Bluetooth Sound System", "Swimming Platform", "Refrigerator", "Shower", "Sun Deck", "GPS Navigation"],
    images: [
      "https://picsum.photos/800/600?random=1",
      "https://picsum.photos/800/600?random=2",
      "https://picsum.photos/800/600?random=3"
    ],
    rating: 4.9,
    reviewCount: 28,
    featured: true,
    boatOwner: {
      name: "Michael Scott",
      image: "https://picsum.photos/200/200?random=4",
      responseRate: 98
    }
  },
  {
    id: "boat-02",
    name: "Ocean Voyager",
    type: "Sailing Yacht",
    location: "Chalong Bay, Phuket",
    price: 180,
    capacity: 6,
    length: 38,
    year: 2018,
    description: "Set sail on this beautiful sailing yacht and enjoy the peaceful experience of gliding through the waves powered by the wind.",
    amenities: ["Fully Equipped Galley", "Cabin Berths", "Marine Toilet", "Snorkeling Gear", "Cockpit Cushions", "VHF Radio"],
    images: [
      "https://picsum.photos/800/600?random=5",
      "https://picsum.photos/800/600?random=6",
      "https://picsum.photos/800/600?random=7"
    ],
    rating: 4.7,
    reviewCount: 19,
    featured: true,
    boatOwner: {
      name: "Emily Johnson",
      image: "https://picsum.photos/200/200?random=8",
      responseRate: 95
    }
  },
  {
    id: "boat-03",
    name: "Coastal Explorer",
    type: "Catamaran",
    location: "Kata Beach, Phuket",
    price: 320,
    capacity: 12,
    length: 45,
    year: 2021,
    description: "Enjoy the ultimate stability and space of this modern catamaran. Great for larger groups wanting to explore coastal waters in comfort.",
    amenities: ["Spacious Sundeck", "Fresh Water Shower", "Kitchenette", "Bluetooth Speakers", "Snorkeling Equipment", "Cooler"],
    images: [
      "https://picsum.photos/800/600?random=9",
      "https://picsum.photos/800/600?random=10",
      "https://picsum.photos/800/600?random=11"
    ],
    rating: 4.8,
    reviewCount: 34,
    featured: true,
    boatOwner: {
      name: "David Wilson",
      image: "https://picsum.photos/200/200?random=12",
      responseRate: 99
    }
  },
  {
    id: "boat-04",
    name: "Harbor Cruiser",
    type: "Pontoon Boat",
    location: "Kamala Beach, Phuket",
    price: 120,
    capacity: 10,
    length: 24,
    year: 2019,
    description: "Perfect for a relaxed day on the water. This comfortable pontoon boat is ideal for sightseeing, fishing, or just cruising the harbor.",
    amenities: ["Bimini Top", "Bluetooth Stereo", "Swim Ladder", "Comfortable Seating", "Cooler", "USB Charging"],
    images: [
      "https://picsum.photos/800/600?random=13",
      "https://picsum.photos/800/600?random=14",
      "https://picsum.photos/800/600?random=15"
    ],
    rating: 4.6,
    reviewCount: 23,
    boatOwner: {
      name: "Sarah Martinez",
      image: "https://picsum.photos/200/200?random=16",
      responseRate: 92
    }
  },
  {
    id: "boat-05",
    name: "Wave Rider",
    type: "Speedboat",
    location: "Rawai Beach, Phuket",
    price: 200,
    capacity: 6,
    length: 26,
    year: 2022,
    description: "Feel the thrill of speed on this powerful speedboat. Ideal for watersports enthusiasts or those who just want to feel the wind in their hair.",
    amenities: ["Powerful Engine", "Wakeboard Rack", "Premium Sound System", "GPS Navigation", "Bimini Top", "Swim Platform"],
    images: [
      "https://picsum.photos/800/600?random=17",
      "https://picsum.photos/800/600?random=18",
      "https://picsum.photos/800/600?random=19"
    ],
    rating: 4.8,
    reviewCount: 17,
    boatOwner: {
      name: "Alex Thompson",
      image: "https://picsum.photos/200/200?random=20",
      responseRate: 97
    }
  },
  {
    id: "boat-06",
    name: "Sunset Serenity",
    type: "Bowrider",
    location: "Karon Beach, Phuket",
    price: 150,
    capacity: 8,
    length: 28,
    year: 2020,
    description: "A versatile boat perfect for day cruising, watersports, and making memories on the water with family and friends.",
    amenities: ["Premium Sound System", "Bimini Top", "Swim Platform", "Comfortable Seating", "Storage Space", "Cup Holders"],
    images: [
      "https://picsum.photos/800/600?random=21",
      "https://picsum.photos/800/600?random=22",
      "https://picsum.photos/800/600?random=23"
    ],
    rating: 4.5,
    reviewCount: 21,
    boatOwner: {
      name: "Jessica Brown",
      image: "https://picsum.photos/200/200?random=24",
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
