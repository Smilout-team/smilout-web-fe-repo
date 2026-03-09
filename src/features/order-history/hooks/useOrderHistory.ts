import { useQuery } from '@tanstack/react-query';
import { orderHistoryService } from '../services/orderHistoryService';

export const useOrderHistory = () => {
  return useQuery({
    queryKey: ['order-history', 'my-orders'],
    queryFn: () => orderHistoryService.getMyOrders(),
  });
};
