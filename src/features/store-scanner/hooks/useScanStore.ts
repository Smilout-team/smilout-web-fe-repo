import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ScanStoreRequest, ScanStoreResponse } from '../types';
import { storeScannerService } from '../services/storeScannerService';
import formatErrorMessage from '@/shared/utils/formatErrorMessage';

export const useScanStore = () => {
  return useMutation({
    mutationFn: async (
      payload: ScanStoreRequest
    ): Promise<ScanStoreResponse> => {
      const response = await storeScannerService.scanStore(payload);

      if (!response.data) {
        throw new Error(response.message || 'Failed to scan store');
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success('Đã kết nối với cửa hàng!');
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? formatErrorMessage(error.message)
          : 'Không thể quét mã cửa hàng';
      toast.error(errorMessage);
    },
  });
};
