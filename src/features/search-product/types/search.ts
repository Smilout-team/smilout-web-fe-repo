export interface Store {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  isSelected?: boolean;
}
export interface ProductCategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  category: string | ProductCategory;
  description: string;
}

export interface ProductResponse {
  barcode: string;
  category: { id: string; name: string };
  categoryId: string;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  discountingPercentage: string;
  discountingPrice: string;
  expiryDate: string;
  id: string;
  imageUrls: string[];
  isAvailable: boolean;
  manufacturingDate: string;
  name: string;
  originalPrice: string;
  stockQuantity: number;
  storeId: string;
  updatedAt: string;
}
