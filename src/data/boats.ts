
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
    location: "Patong Beach, Phuket",
    price: 250,
    capacity: 8,
    length: 42,
    year: 2020,
    description: "Experience luxury on the water with this stunning motor yacht. Perfect for day trips or sunset cruises with family and friends.",
    amenities: ["Bluetooth Sound System", "Swimming Platform", "Refrigerator", "Shower", "Sun Deck", "GPS Navigation"],
    images: [
      "https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg",
      "https://images.pexels.com/photos/673835/boat-sea-ship-yacht-673835.jpeg",
      "https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg"
    ],
    rating: 4.9,
    reviewCount: 28,
    featured: true,
    boatOwner: {
      name: "Michael Scott",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
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
      "https://images.pexels.com/photos/273886/pexels-photo-273886.jpeg",
      "https://images.pexels.com/photos/296278/pexels-photo-296278.jpeg",
      "https://images.pexels.com/photos/1295038/pexels-photo-1295038.jpeg"
    ],
    rating: 4.7,
    reviewCount: 19,
    featured: true,
    boatOwner: {
      name: "Emily Johnson",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
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
      "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg",
      "https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg",
      "https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg"
    ],
    rating: 4.8,
    reviewCount: 34,
    featured: true,
    boatOwner: {
      name: "David Wilson",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
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
      "https://images.pexels.com/photos/144273/pexels-photo-144273.jpeg",
      "https://images.pexels.com/photos/2179295/pexels-photo-2179295.jpeg",
      "https://images.pexels.com/photos/92866/pexels-photo-92866.jpeg"
    ],
    rating: 4.6,
    reviewCount: 23,
    boatOwner: {
      name: "Sarah Martinez",
      image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg",
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
      "https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg",
      "https://images.pexels.com/photos/1427741/pexels-photo-1427741.jpeg",
      "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg"
    ],
    rating: 4.8,
    reviewCount: 17,
    boatOwner: {
      name: "Alex Thompson",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
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
      "https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg",
      "https://images.pexels.com/photos/127160/pexels-photo-127160.jpeg",
      "https://images.pexels.com/photos/173789/pexels-photo-173789.jpeg"
    ],
    rating: 4.5,
    reviewCount: 21,
    boatOwner: {
      name: "Jessica Brown",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
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
