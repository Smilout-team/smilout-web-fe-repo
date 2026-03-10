import { useQuery } from '@tanstack/react-query';
import { checkoutService } from '../services/checkoutService';

export const useSearchDeliveryAddresses = (
  keyword: string,
  userLatitude?: number,
  userLongitude?: number
) => {
  const normalizedKeyword = keyword.trim();

  return useQuery({
    queryKey: [
      'checkout',
      'delivery-address-search',
      normalizedKeyword,
      userLatitude,
      userLongitude,
    ],
    queryFn: () =>
      checkoutService.searchDeliveryAddressOptions(
        normalizedKeyword,
        userLatitude!,
        userLongitude!
      ),
    enabled:
      normalizedKeyword.length >= 2 &&
      typeof userLatitude === 'number' &&
      typeof userLongitude === 'number',
    staleTime: 10_000,
  });
};
