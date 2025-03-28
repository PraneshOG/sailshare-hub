
export type Boat = {
  id: string;
  name: string;
  type: string;
  location: string;
  price_per_hour: number;
  capacity: number;
  description: string;
  features: string[];
  images: string[];
  rating: number;
  created_at: string;
};

export const boats: Boat[] = [
  {
    id: "boat-01",
    name: "Azure Dream",
    type: "Motor Yacht",
    location: "Patong Beach, Phuket",
    price_per_hour: 250,
    capacity: 8,
    description: "Experience luxury on the water with this stunning motor yacht. Perfect for day trips or sunset cruises with family and friends.",
    features: ["Bluetooth Sound System", "Swimming Platform", "Refrigerator", "Shower", "Sun Deck", "GPS Navigation"],
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60"
    ],
    rating: 4.9,
    created_at: new Date().toISOString()
  },
  {
    id: "boat-02",
    name: "Ocean Voyager",
    type: "Sailing Yacht",
    location: "Chalong Bay, Phuket",
    price_per_hour: 180,
    capacity: 6,
    description: "Set sail on this beautiful sailing yacht and enjoy the peaceful experience of gliding through the waves powered by the wind.",
    features: ["Fully Equipped Galley", "Cabin Berths", "Marine Toilet", "Snorkeling Gear", "Cockpit Cushions", "VHF Radio"],
    images: [
      "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60"
    ],
    rating: 4.7,
    created_at: new Date().toISOString()
  },
  {
    id: "boat-03",
    name: "Coastal Explorer",
    type: "Catamaran",
    location: "Kata Beach, Phuket",
    price_per_hour: 320,
    capacity: 12,
    description: "Enjoy the ultimate stability and space of this modern catamaran. Great for larger groups wanting to explore coastal waters in comfort.",
    features: ["Spacious Sundeck", "Fresh Water Shower", "Kitchenette", "Bluetooth Speakers", "Snorkeling Equipment", "Cooler"],
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop&q=60"
    ],
    rating: 4.8,
    created_at: new Date().toISOString()
  },
  {
    id: "boat-04",
    name: "Harbor Cruiser",
    type: "Pontoon Boat",
    location: "Kamala Beach, Phuket",
    price_per_hour: 120,
    capacity: 10,
    description: "Perfect for a relaxed day on the water. This comfortable pontoon boat is ideal for sightseeing, fishing, or just cruising the harbor.",
    features: ["Bimini Top", "Bluetooth Stereo", "Swim Ladder", "Comfortable Seating", "Cooler", "USB Charging"],
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60"
    ],
    rating: 4.6,
    created_at: new Date().toISOString()
  },
  {
    id: "boat-05",
    name: "Wave Rider",
    type: "Speedboat",
    location: "Rawai Beach, Phuket",
    price_per_hour: 200,
    capacity: 6,
    description: "Feel the thrill of speed on this powerful speedboat. Ideal for watersports enthusiasts or those who just want to feel the wind in their hair.",
    features: ["Powerful Engine", "Wakeboard Rack", "Premium Sound System", "GPS Navigation", "Bimini Top", "Swim Platform"],
    images: [
      "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop&q=60"
    ],
    rating: 4.8,
    created_at: new Date().toISOString()
  },
  {
    id: "boat-06",
    name: "Sunset Serenity",
    type: "Bowrider",
    location: "Karon Beach, Phuket",
    price_per_hour: 150,
    capacity: 8,
    description: "A versatile boat perfect for day cruising, watersports, and making memories on the water with family and friends.",
    features: ["Premium Sound System", "Bimini Top", "Swim Platform", "Comfortable Seating", "Storage Space", "Cup Holders"],
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop&q=60"
    ],
    rating: 4.5,
    created_at: new Date().toISOString()
  }
];

export const getBoatById = (id: string) => {
  return boats.find(boat => boat.id === id);
};

export const getFeaturedBoats = () => {
  return boats.slice(0, 3);
};

export const getAllBoats = () => {
  return boats;
};
