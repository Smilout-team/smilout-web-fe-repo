import { useQuery } from '@tanstack/react-query';
import { ordersManagementService } from '../services/ordersManagementService';

export const useOrdersManagement = () => {
  return useQuery({
    queryKey: ['store-staff', 'orders-management'],
    queryFn: ordersManagementService.getOrders,
  });
};
