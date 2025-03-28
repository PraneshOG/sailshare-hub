
import { supabase } from './client';

export type Boat = {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  price_per_hour: number;
  description: string;
  features: string[];
  images: string[];
  rating: number;
  created_at: string;
}

export type Deal = {
  id: string;
  title: string;
  description: string;
  original_price: number;
  discounted_price: number;
  location: string;
  image_url: string;
  valid_until: string;
  created_at: string;
}

export async function fetchBoats() {
  const { data, error } = await supabase
    .from('boats')
    .select('*');
  
  if (error) {
    console.error('Error fetching boats:', error);
    return [];
  }
  
  return data as Boat[];
}

export async function fetchDeals() {
  const { data, error } = await supabase
    .from('deals')
    .select('*');
  
  if (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
  
  return data as Deal[];
}
