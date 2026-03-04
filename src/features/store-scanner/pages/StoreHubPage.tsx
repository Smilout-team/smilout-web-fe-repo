import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut, ScanLine, ShoppingCart, Store } from 'lucide-react';
import { Button } from '@/shared/components/common/Button';
import { ROUTES } from '@/shared/constants/routes';
import { STORAGE_KEYS } from '@/shared/constants';
import { useStoreDetail } from '../hooks/useStoreDetail';
import type { ActiveStoreSession } from '../types';

interface StoreCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export const StoreHubPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeStoreSession = useMemo((): ActiveStoreSession | null => {
    const routeState = location.state as Partial<ActiveStoreSession> | null;

    if (routeState?.storeId && routeState?.orderId) {
      return {
        storeId: routeState.storeId,
        orderId: routeState.orderId,
      };
    }

    const rawSession = localStorage.getItem(STORAGE_KEYS.ACTIVE_STORE_SESSION);
    if (!rawSession) {
      return null;
    }

    try {
      const parsedSession = JSON.parse(
        rawSession
      ) as Partial<ActiveStoreSession>;

      if (parsedSession.storeId && parsedSession.orderId) {
        return {
          storeId: parsedSession.storeId,
          orderId: parsedSession.orderId,
        };
      }
    } catch {
      return null;
    }

    return null;
  }, [location.state]);

  const { data: storeDetail } = useStoreDetail(
    activeStoreSession?.storeId ?? null
  );

  const cartItems = useMemo<StoreCartItem[]>(() => {
    const routeState = location.state as
      | { cartItems?: StoreCartItem[] }
      | null
      | undefined;

    if (Array.isArray(routeState?.cartItems)) {
      return routeState.cartItems;
    }

    return [];
  }, [location.state]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleExitStore = () => {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_STORE_SESSION);
    navigate(ROUTES.SCAN_STORE);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pb-32">
      <div className="px-4 py-6">
        <div className="mx-auto space-y-6">
          <div className="rounded-[var(--radius-xl)] bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] p-3 text-white shadow-md">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 rounded-full bg-white/20 p-1.5">
                  <Store size={14} />
                </div>
                <div>
                  <p className="text-[length:var(--text-xs)] opacity-90">
                    Đang mua sắm tại
                  </p>
                  <p className="text-[length:var(--text-lg)] font-[var(--font-semibold)]">
                    {storeDetail?.storeName ?? 'Đang tải cửa hàng...'}
                  </p>
                </div>
              </div>

              <Button
                variant="soft"
                size="sm"
                className="!rounded-[10px] !bg-white/20 !px-3 !py-1.5 !text-white"
                onClick={handleExitStore}
                leftIcon={<LogOut size={14} />}
              >
                Thoát
              </Button>
            </div>

            <div className="rounded-[var(--radius-lg)] bg-white/85 px-4 py-3 text-[var(--text-primary)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart
                    size={16}
                    className="text-[var(--color-primary)]"
                  />
                  <p className="text-[length:var(--text-sm)]">
                    {totalItems} sản phẩm
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                    Tổng tạm tính
                  </p>
                  <p className="text-[length:var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-primary)]">
                    {totalAmount.toLocaleString('vi-VN')}₫
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(ROUTES.SCAN_PRODUCT)}
            className="flex w-full flex-col items-center justify-center rounded-[var(--radius-xl)] bg-gradient-to-b from-[#FF6B6B] to-[#FF5757] py-10 text-white shadow-md transition-all"
          >
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <ScanLine size={30} className="text-white" />
            </div>
            <p className="text-[length:var(--text-2xl)] font-[var(--font-semibold)]">
              Quét sản phẩm
            </p>
            <p className="text-[length:var(--text-sm)] opacity-90">
              Nhấn để quét mã vạch sản phẩm
            </p>
          </button>

          <div className="rounded-[var(--radius-lg)] border border-[#3B82F6]/20 bg-[#EFF6FF] p-3">
            <p className="text-[length:var(--text-xs)] font-[var(--font-medium)] text-[#1E40AF]">
              ⓘ Hướng dẫn mua sắm:
            </p>
            <ul className="mt-1 list-inside list-disc space-y-1 text-[length:var(--text-xs)] text-[#1E40AF]">
              <li>Quét mã vạch sản phẩm để thêm vào giỏ hàng</li>
              <li>Kiểm tra giỏ hàng và thanh toán</li>
              <li>Nhấn mã QR để rời khỏi cửa hàng</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[length:var(--text-xl)] font-[var(--font-medium)] text-[var(--text-primary)]">
              Giỏ hàng của bạn
            </h3>

            {cartItems.length > 0 ? (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-secondary)]">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>

                      <div>
                        <p className="text-[length:var(--text-sm)] text-[var(--text-primary)]">
                          {item.name}
                        </p>
                        <p className="text-[length:var(--text-sm)] text-[var(--color-primary)]">
                          {item.price.toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                        Số lượng
                      </p>
                      <p className="text-[length:var(--text-xl)] font-[var(--font-medium)] text-[var(--text-primary)]">
                        x{item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-4 text-center text-[length:var(--text-sm)] text-[var(--text-secondary)]">
                Chưa có sản phẩm trong giỏ hàng
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed right-0 bottom-16 left-0 border-t border-[var(--border-default)] bg-[var(--bg-card)] px-4 py-3">
        <div className="mx-auto flex max-w-md gap-3">
          <Button
            variant="secondary"
            fullWidth
            size="lg"
            className="!py-3"
            onClick={() => navigate(ROUTES.CART)}
          >
            Xem giỏ hàng
          </Button>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            className="!py-3"
            onClick={() => navigate('/checkout')}
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreHubPage;
