import { useQuery } from '@tanstack/react-query';
import { customersService } from '../services/consumersService';

export const useConsumersInStore = (storeId: string) => {
  return useQuery({
    queryKey: ['store-staff', 'consumers-in-store', storeId],
    queryFn: () => customersService.getConsumersInStore(storeId),
    enabled: !!storeId,
  });
};
