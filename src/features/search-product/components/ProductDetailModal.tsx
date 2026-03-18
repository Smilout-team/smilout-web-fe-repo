import { X } from 'lucide-react';
import { type Product } from '../types/search';
import Button from '@/shared/components/common/Button';
import { toast } from 'sonner';
import { STORAGE_KEYS } from '@/shared/constants';
import { storeHubService } from '@/shared/services/storeHubService';
export interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCartSuccess?: () => void;
}
export default function ProductDetailModal({
  product,
  onClose,
  onAddToCartSuccess,
}: ProductDetailModalProps) {
  if (!product) return null;

  const handleAddToCart = async () => {
    try {
      const rawSession = localStorage.getItem(
        STORAGE_KEYS.ACTIVE_STORE_SESSION
      );
      if (!rawSession) throw new Error('Vui lòng quét cửa hàng trước');
      const { orderId } = JSON.parse(rawSession);
      if (!orderId) throw new Error('Không tìm thấy giỏ hàng');
      await storeHubService.addToCart(orderId, product.id, 1);
      toast.success('Đã thêm vào giỏ hàng');
      if (onAddToCartSuccess) onAddToCartSuccess();
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Không thể thêm vào giỏ');
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 mb-16 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="animate-slide-up w-full rounded-t-[var(--radius-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="truncate pr-4 text-[length:var(--text-xl)] font-[var(--font-bold)] text-[var(--text-primary)]">
            {product.name}
          </p>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)]">
            <X size={24} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="mx-auto mb-4 h-56 rounded-[var(--radius-md)]"
          />
          <div className="mb-4 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-page)] p-3">
            <p className="mb-2 text-[length:var(--text-lg)] font-[var(--font-semibold)] text-[var(--text-primary)]">
              Chi tiết sản phẩm
            </p>
            <p className="mb-3 text-[length:var(--text-md)] text-[var(--text-secondary)]">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 pt-2">
            <p className="text-[length:var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-primary)]">
              {product.price.toLocaleString('vi-VN')}đ
            </p>
            <Button
              variant="primary"
              shape="pill"
              size="md"
              className=""
              onClick={handleAddToCart}
            >
              Thêm vào giỏ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
