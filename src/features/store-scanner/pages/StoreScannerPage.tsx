import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { AppHeader } from '@/shared/components/common/Header';
import { Button } from '@/shared/components/common/Button';
import { ROUTES } from '@/shared/constants/routes';
import { STORAGE_KEYS } from '@/shared/constants';
import { useScanStore } from '../hooks';
import { QRScanFrame, QRScanGuide } from '../components';

export const StoreScannerPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const scanStoreMutation = useScanStore();

  const handleScanQR = () => {
    setIsScanning((prev) => !prev);
  };

  const handleScanSuccess = async (decodedText: string) => {
    setIsScanning(false);

    try {
      const result = await scanStoreMutation.mutateAsync({
        storeId: decodedText,
      });

      localStorage.setItem(
        STORAGE_KEYS.ACTIVE_STORE_SESSION,
        JSON.stringify({
          storeId: result.storeId,
          orderId: result.orderId,
        })
      );
      navigate(ROUTES.STORE_HUB, {
        state: {
          storeId: result.storeId,
          orderId: result.orderId,
        },
      });
    } catch (error) {
      void error;
    }
  };

  const handleScanError = (error: string) => {
    toast.error(`Lỗi quét mã: ${error}`);
  };

  const handleFindStore = () => {
    toast.info('Tính năng tìm cửa hàng đang được phát triển');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <AppHeader title="Quét mã cửa hàng" />

      <div className="mb-16 px-4 py-6">
        <div className="mx-auto max-w-md space-y-4">
          <div className="text-center">
            <h2 className="text-[length:var(--text-xl)] font-[var(--font-semibold)] text-[var(--text-primary)]">
              Quét mã QR tại cửa hàng
            </h2>
            <p className="mt-1 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
              Tìm mã QR tại cửa ra vào hoặc quầy thanh toán
            </p>
          </div>

          <QRScanFrame
            isScanning={isScanning}
            onScanSuccess={handleScanSuccess}
            onScanError={handleScanError}
          />

          <div className="space-y-3">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              className="h-14"
              onClick={handleScanQR}
              disabled={scanStoreMutation.isPending}
            >
              {scanStoreMutation.isPending
                ? 'Đang xử lý...'
                : isScanning
                  ? 'Dừng quét'
                  : 'Quét mã QR'}
            </Button>

            <Button
              variant="outline"
              fullWidth
              size="lg"
              className="h-14"
              leftIcon={<MapPin size={20} />}
              onClick={handleFindStore}
            >
              Tìm cửa hàng gần nhất
            </Button>
          </div>

          <QRScanGuide />
        </div>
      </div>
    </div>
  );
};

export default StoreScannerPage;
