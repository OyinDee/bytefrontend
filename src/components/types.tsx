export interface Meal {
  customId: string;
  name: string;
  description?: string;
  price: number;
  availability: boolean;
  imageUrl?: string;
  tag: "regular" | "combo" | "add-on";
  per?: string;  
  quantity?: number; 
  restaurantId?: string;
}


export interface Order {
  id: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  totalAmount: number;
  meals: Meal[]; 
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