import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export function useStoreProducts(storeId: string) {
  return useQuery({
    queryKey: ['store-products', storeId],
    queryFn: () => productService.getProductByStoreId(storeId),
    enabled: !!storeId,
  });
}
