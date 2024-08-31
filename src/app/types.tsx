// types.ts
export type Meal = {
    name: string;
    image: string;
    price: number;
    per: string;
    countable: boolean;
    count?: number;  // Only required if countable is true
    available: boolean;
  };
  
// Define the Order type
export interface Order {
  id: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  totalAmount: number;
  meals: Meal[]; // Include meals in the order
}

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  image: string;
  operatingHours: string;
  rating: number;
};