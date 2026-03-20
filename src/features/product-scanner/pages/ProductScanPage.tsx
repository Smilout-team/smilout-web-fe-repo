import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { AppHeader } from '@/shared/components/common/Header';
import { Button } from '@/shared/components/common/Button';
import { STORAGE_KEYS } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { useOrderItems } from '@/shared/hooks/useOrderItems';
import type { ActiveStoreSession, OrderItem } from '@/shared/types';
import { useScanProduct } from '../hooks';
import { BarcodeScanFrame } from '../components/BarcodeScanFrame';
import type { ScanProductResponse } from '../types';

export const ProductScanPage = () => {
  const navigate = useNavigate();
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<ScanProductResponse | null>(null);
  const [lastScannedProduct, setLastScannedProduct] =
    useState<OrderItem | null>(null);
  const scanProductMutation = useScanProduct();

  const activeStoreSession = useMemo((): ActiveStoreSession | null => {
    const rawSession = localStorage.getItem(STORAGE_KEYS.ACTIVE_STORE_SESSION);
    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession) as ActiveStoreSession;
    } catch {
      return null;
    }
  }, []);

  const { data: orderItems = [], refetch: refetchOrderItems } = useOrderItems(
    activeStoreSession?.orderId ?? null
  );

  const submitBarcode = async (barcode: string) => {
    if (!activeStoreSession?.storeId) {
      navigate(ROUTES.SCAN_STORE);
      return;
    }

    try {
      const result = await scanProductMutation.mutateAsync({
        barcode: barcode.trim(),
      });

      setLastScan(result);
      setBarcodeInput('');

      const refreshedOrderItems = await refetchOrderItems();
      const latestItems = refreshedOrderItems.data ?? orderItems;
      const productDetails = latestItems.find(
        (item) => item.productId === result.productId
      );
      setLastScannedProduct(productDetails ?? null);
    } catch (error) {
      void error;
    }
  };

  const handleBarcodeSubmit = async () => {
    if (!barcodeInput.trim()) {
      return;
    }

    await submitBarcode(barcodeInput);
  };

  const handleToggleCamera = () => {
    setIsScanning((prev) => !prev);
  };

  const handleScanSuccess = async (barcode: string) => {
    setIsScanning(false);
    await submitBarcode(barcode);
  };

  const handleScanError = (error: string) => {
    void error;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pb-32">
      <AppHeader title="Quét sản phẩm" showBack />

      <div className="px-4 py-6">
        <div className="mx-auto space-y-6">
          <div className="space-y-3 rounded-[var(--radius-xl)] bg-white p-4 shadow-sm">
            <label className="block text-[length:var(--text-sm)] font-[var(--font-semibold)] text-[var(--text-primary)]">
              Nhập mã vạch sản phẩm
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    void handleBarcodeSubmit();
                  }
                }}
                autoFocus
                placeholder="Quét hoặc nhập mã số"
                className="flex-1 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-3 py-2.5 text-[length:var(--text-base)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-primary)] focus:outline-none"
              />
              <Button
                variant="primary"
                onClick={() => void handleBarcodeSubmit()}
                disabled={scanProductMutation.isPending || !barcodeInput.trim()}
                className="px-4 py-2.5"
              >
                {scanProductMutation.isPending ? 'Đang...' : 'Thêm'}
              </Button>
            </div>

            <Button
              variant="outline"
              fullWidth
              leftIcon={<Camera size={18} />}
              onClick={handleToggleCamera}
              disabled={scanProductMutation.isPending}
            >
              {isScanning ? 'Tắt camera' : 'Bật camera'}
            </Button>
          </div>

          {isScanning && (
            <div className="space-y-3 rounded-[var(--radius-xl)] bg-white p-4 shadow-sm">
              <h3 className="text-[length:var(--text-sm)] font-[var(--font-semibold)] text-[var(--text-primary)]">
                Quét mã vạch từ camera
              </h3>

              <BarcodeScanFrame
                isScanning={isScanning}
                onScanSuccess={handleScanSuccess}
                onScanError={handleScanError}
              />

              <div className="space-y-2 rounded-[var(--radius-lg)] border border-amber-100 bg-amber-50 p-3">
                <p className="text-[length:var(--text-xs)] font-semibold text-amber-900">
                  Mẹo quét nhanh:
                </p>
                <ul className="space-y-1 text-[length:var(--text-xs)] text-amber-800">
                  <li>• Giữ điện thoại ổn định và song song với mã vạch</li>
                  <li>• Đảm bảo mã vạch nằm hoàn toàn trong khung</li>
                  <li>• Tránh ánh sáng phản chiếu trực tiếp</li>
                  <li>• Nếu không hoạt động, nhập thủ công ở trên</li>
                </ul>
              </div>
            </div>
          )}

          {lastScan && (
            <div className="space-y-3 rounded-[var(--radius-xl)] bg-white p-4 shadow-sm">
              {lastScannedProduct ? (
                <>
                  <div className="flex items-start gap-3">
                    {lastScannedProduct.imageUrls?.[0] && (
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-secondary)]">
                        <img
                          src={lastScannedProduct.imageUrls[0]}
                          alt={lastScannedProduct.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[length:var(--text-xs)] font-[var(--font-medium)] text-blue-700">
                          {lastScannedProduct.category}
                        </span>
                        <span className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                          Sản phẩm vừa thêm
                        </span>
                      </div>

                      <p className="line-clamp-2 text-[length:var(--text-lg)] leading-tight font-[var(--font-semibold)] text-[var(--text-primary)]">
                        {lastScannedProduct.name}
                      </p>

                      <div className="flex items-center gap-2">
                        <p className="text-[length:var(--text-xl)] font-[var(--font-bold)] text-[var(--color-primary)]">
                          {lastScannedProduct.price.toLocaleString('vi-VN')}₫
                        </p>
                        <span className="rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-[length:var(--text-xs)] font-[var(--font-medium)] text-[var(--text-secondary)]">
                          +{lastScan.quantity} sp
                        </span>
                      </div>

                      {lastScannedProduct.expiryDate && (
                        <p className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                          HSD:{' '}
                          {new Date(
                            lastScannedProduct.expiryDate
                          ).toLocaleDateString('vi-VN')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-[var(--radius-lg)] border border-green-200 bg-green-50 px-3 py-2">
                    <p className="text-[length:var(--text-sm)] font-[var(--font-medium)] text-green-800">
                      ✓ {lastScan.message}
                    </p>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setLastScan(null);
                    setLastScannedProduct(null);
                  }}
                >
                  Xóa thông tin
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate(ROUTES.STORE_HUB)}
                >
                  Về cửa hàng
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
