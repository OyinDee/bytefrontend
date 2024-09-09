// types.ts
export type Meal = {
    name: string;
    imageUrl: string;
    price: number;
    customId: string;
    per: string;
    description: string;
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
  customId: string;
  name: string;
  description: string;
  imageUrl: string;
  operatingHours: string;
  meals: Meal[];
  rating: number;
};


export interface Notification {
  id: string;
  message: string;
}
