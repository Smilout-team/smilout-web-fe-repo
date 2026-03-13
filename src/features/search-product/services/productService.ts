import type { ApiResponse } from '@/core/api/types';
import type { Product, ProductResponse } from '../types';
import { httpClient } from '@/core/api/httpClient.api';

export const productService = {
  getProductByStoreId: async (storeId: string) => {
    const res = await httpClient.get<ApiResponse<ProductResponse[]>>(
      `/stores/${storeId}/products`
    );
    return res.data.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.discountingPrice ?? 0),
      imageUrl:
        Array.isArray(p.imageUrls) && p.imageUrls.length > 0
          ? p.imageUrls[0]
          : '',
      imageUrls: p.imageUrls || [],
      category: p.category || p.categoryId || '',
      description: p.description || '',
    })) as Product[];
  },
};
