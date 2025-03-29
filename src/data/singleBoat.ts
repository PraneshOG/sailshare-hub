
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

export const boat: Boat = {
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
};
