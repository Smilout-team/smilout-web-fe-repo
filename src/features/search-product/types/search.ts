export interface Store {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  isSelected?: boolean;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
}
