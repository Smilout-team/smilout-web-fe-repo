import { useQuery } from '@tanstack/react-query';
import { orderHistoryService } from '../services/orderHistoryService';

export const useLatestOrder = () => {
  return useQuery({
    queryKey: ['order-history', 'my-latest-order'],
    queryFn: () => orderHistoryService.getMyLatestOrder(),
  });
};
