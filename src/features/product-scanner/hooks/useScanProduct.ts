import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ScanProductRequest, ScanProductResponse } from '../types';
import { productScannerService } from '../services/productScannerService';
import formatErrorMessage from '@/shared/utils/formatErrorMessage';

export const useScanProduct = () => {
  return useMutation({
    mutationFn: async (
      payload: ScanProductRequest
    ): Promise<ScanProductResponse> => {
      return productScannerService.scanProduct(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Thêm sản phẩm thành công!');
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Không thể quét mã sản phẩm';

      if (errorMessage.includes('Không tìm thấy mã vạch')) {
        return;
      }

      toast.error(formatErrorMessage(errorMessage));
    },
  });
};
