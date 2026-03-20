import type { NearbyStore } from '@/features/store-scanner/types';

export type ApiResponse<T> = {
  map(
    arg0: (s: NearbyStore) => {
      storeId: string;
      name: string;
      address: string;
      distance: number;
      rating: number;
    }
  ): import('react').SetStateAction<
    import('../../features/store-scanner/types').NearbyStore[]
  >;
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
};
