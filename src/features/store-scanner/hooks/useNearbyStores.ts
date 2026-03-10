import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { storeScannerService } from '../services/storeScannerService';
import type { NearbyStore } from '../types';

export const useNearbyStores = () => {
  return useMutation({
    mutationFn: async (payload: {
      latitude: number;
      longitude: number;
      limit?: number;
    }): Promise<NearbyStore[]> => {
      const response = await storeScannerService.getNearbyStores(
        payload.latitude,
        payload.longitude,
        payload.limit
      );

      if (!response.data) {
        throw new Error(
          response.message || 'Không lấy được danh sách cửa hàng'
        );
      }

      return response.data;
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Không thể tìm cửa hàng gần nhất'
      );
    },
  });
};
