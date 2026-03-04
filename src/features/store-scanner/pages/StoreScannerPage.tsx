import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { AppHeader } from '@/shared/components/common/Header';
import { Button } from '@/shared/components/common/Button';
import { QRScanFrame, QRScanGuide } from '../components';

export const StoreScannerPage = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScanQR = () => {
    setIsScanning((prev) => !prev);
  };

  const handleScanSuccess = (decodedText: string) => {
    setIsScanning(false);
    toast.success(`Đã quét thành công: ${decodedText}`);
    // TODO: Navigate to store page or connect to store
    console.log('QR Code scanned:', decodedText);
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

      <div className="px-4 py-6">
        <div className="mx-auto max-w-md space-y-4">
          {/* Title section */}
          <div className="text-center">
            <h2 className="text-[length:var(--text-xl)] font-[var(--font-semibold)] text-[var(--text-primary)]">
              Quét mã QR tại cửa hàng
            </h2>
            <p className="mt-1 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
              Tìm mã QR tại cửa ra vào hoặc quầy thanh toán
            </p>
          </div>

          {/* QR Scanner Frame */}
          <QRScanFrame
            isScanning={isScanning}
            onScanSuccess={handleScanSuccess}
            onScanError={handleScanError}
          />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              className="h-14"
              onClick={handleScanQR}
            >
              {isScanning ? 'Dừng quét' : 'Quét mã QR'}
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

          {/* Guide Section */}
          <QRScanGuide />
        </div>
      </div>
    </div>
  );
};

export default StoreScannerPage;
