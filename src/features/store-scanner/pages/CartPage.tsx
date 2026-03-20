import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { AppHeader } from '@/shared/components/common/Header';
import { Button } from '@/shared/components/common/Button';
import { ROUTES } from '@/shared/constants/routes';
import { STORAGE_KEYS } from '@/shared/constants';
import { useOrderItems } from '@/shared/hooks/useOrderItems';
import { storeHubService } from '@/shared/services/storeHubService';
import type { ActiveStoreSession } from '@/shared/types';

export const CartPage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

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

  const { data: orderItems = [], refetch } = useOrderItems(
    activeStoreSession?.orderId ?? null
  );

  const isOnlineFlow = activeStoreSession?.context === 'online';

  const total = useMemo(() => {
    return orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [orderItems]);

  useEffect(() => {
    if (itemToDelete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [itemToDelete]);

  const handleDeleteItem = async (itemId: string) => {
    if (!activeStoreSession?.orderId) return;

    try {
      setIsProcessing(true);
      await storeHubService.deleteOrderItem(activeStoreSession.orderId, itemId);
      toast.success('Xóa sản phẩm thành công');
      await refetch();
      setItemToDelete(null);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Không thể xóa sản phẩm';
      toast.error(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (!activeStoreSession?.orderId || newQuantity <= 0) return;

    try {
      setIsProcessing(true);
      await storeHubService.updateOrderItemQuantity(
        activeStoreSession.orderId,
        itemId,
        newQuantity
      );
      await refetch();
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Không thể cập nhật số lượng';
      toast.error(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckout = () => {
    if (orderItems.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }
    navigate('/checkout');
  };

  if (!activeStoreSession?.orderId) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)]">
        <AppHeader title="Giỏ hàng" showBack />
        <div className="px-4 py-6 text-center">
          <p className="text-[var(--text-secondary)]">
            Vui lòng quét cửa hàng trước
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pb-32">
      <AppHeader title="Giỏ hàng" showBack />

      <div className="px-4 py-6">
        <div className="mx-auto space-y-4">
          {orderItems.length > 0 ? (
            <div className="space-y-3">
              <div className="mb-4 rounded-[var(--radius-lg)] bg-white p-3 shadow-sm">
                <p className="text-[length:var(--text-sm)] font-[var(--font-medium)] text-[var(--text-secondary)]">
                  {orderItems.length} sản phẩm
                </p>
              </div>

              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-white p-3 shadow-sm"
                >
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-secondary)]">
                    {item.imageUrls?.[0] ? (
                      <img
                        src={item.imageUrls[0]}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex-1">
                    <p className="text-[length:var(--text-sm)] font-[var(--font-medium)] text-[var(--text-primary)]">
                      {item.name}
                    </p>
                    <p className="text-[length:var(--text-sm)] text-[var(--color-primary)]">
                      {item.price.toLocaleString('vi-VN')}₫
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={isProcessing || item.quantity <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="w-8 text-center text-[length:var(--text-sm)] font-[var(--font-medium)]">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      disabled={isProcessing}
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      setItemToDelete({ id: item.id, name: item.name })
                    }
                    disabled={isProcessing}
                    className="ml-2 flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-red-500 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[var(--radius-lg)] bg-white p-6 text-center shadow-sm">
              <p className="text-[length:var(--text-sm)] text-[var(--text-secondary)]">
                Giỏ hàng trống
              </p>
            </div>
          )}

          {orderItems.length > 0 && (
            <div className="space-y-3 rounded-[var(--radius-lg)] bg-white p-4 shadow-sm">
              <div className="flex justify-between border-t border-[var(--border-default)] pt-3">
                <p className="text-[length:var(--text-sm)] font-[var(--font-semibold)] text-[var(--text-primary)]">
                  Tổng cộng
                </p>
                <p className="text-[length:var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-primary)]">
                  {total.toLocaleString('vi-VN')}₫
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {orderItems.length > 0 && (
        <div className="fixed right-0 bottom-16 left-0 border-t border-[var(--border-default)] bg-[var(--bg-card)] px-4 py-3">
          <div className="mx-auto flex gap-3">
            {!isOnlineFlow && (
              <Button
                variant="secondary"
                fullWidth
                size="lg"
                className="!py-3"
                onClick={() => navigate(ROUTES.STORE_HUB)}
              >
                Tiếp tục mua
              </Button>
            )}
            <Button
              variant="primary"
              fullWidth
              size="lg"
              className="!py-3"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Đang...' : 'Thanh toán'}
            </Button>
          </div>
        </div>
      )}

      {itemToDelete && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-4"
          onClick={() => {
            if (!isProcessing) {
              setItemToDelete(null);
            }
          }}
        >
          <div
            className="w-full max-w-sm rounded-[var(--radius-lg)] bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-[length:var(--text-lg)] font-[var(--font-semibold)] text-[var(--text-primary)]">
              Xác nhận xóa sản phẩm
            </h3>
            <p className="mt-2 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
              Bạn có chắc muốn xóa{' '}
              <span className="font-[var(--font-medium)]">
                {itemToDelete.name}
              </span>{' '}
              khỏi giỏ hàng không?
            </p>

            <div className="mt-5 flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setItemToDelete(null)}
                disabled={isProcessing}
              >
                Hủy
              </Button>
              <Button
                variant="danger"
                fullWidth
                onClick={() => handleDeleteItem(itemToDelete.id)}
                disabled={isProcessing}
              >
                {isProcessing ? 'Đang xóa...' : 'Xóa'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
