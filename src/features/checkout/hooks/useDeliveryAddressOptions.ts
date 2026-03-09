import { useQuery } from '@tanstack/react-query';
import { checkoutService } from '../services/checkoutService';

export const useDeliveryAddressOptions = (
  userLatitude?: number,
  userLongitude?: number
) => {
  return useQuery({
    queryKey: [
      'checkout',
      'delivery-address-options',
      userLatitude,
      userLongitude,
    ],
    queryFn: () =>
      checkoutService.getDeliveryAddressOptions(userLatitude!, userLongitude!),
    enabled:
      typeof userLatitude === 'number' && typeof userLongitude === 'number',
  });
};
