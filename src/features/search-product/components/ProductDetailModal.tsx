import React from 'react';
import { X, MapPin } from 'lucide-react';
import { type Product } from '../types/search';
import Button from '@/shared/components/common/Button';
interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isCheckedIn: boolean;
}
export default function ProductDetailModal({
  product,
  onClose,
  isCheckedIn,
}: ProductDetailModalProps) {
  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="animate-slide-up w-full max-w-lg rounded-t-[var(--radius-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]"
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
            src={product.imageUrl}
            alt={product.name}
            className="mb-4 h-56 w-full rounded-[var(--radius-md)] object-cover"
          />
          <div className="mb-4 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-page)] p-3">
            <p className="mb-2 text-[length:var(--text-lg)] font-[var(--font-semibold)] text-[var(--text-primary)]">
              Chi tiết sản phẩm
            </p>
            <p className="mb-3 text-[length:var(--text-md)] text-[var(--text-secondary)]">
              {product.description}
            </p>
            <div className="mt-3 border-t border-[var(--border-default)] pt-3">
              <div className="mb-1 flex items-center gap-2">
                <MapPin size={18} className="text-[var(--color-primary)]" />
                <span className="font-[var(--font-semibold)] text-[var(--text-primary)]">
                  Vị trí kệ:
                </span>
              </div>
              {isCheckedIn ? (
                <p className="ml-6 font-[var(--font-medium)] text-[var(--color-success)]">
                  Dãy A - Kệ số 3 - Tầng 2
                </p>
              ) : (
                <p className="ml-6 text-[length:var(--text-sm)] text-[var(--color-danger)] italic">
                  * Vui lòng Check-in tại cửa hàng để xem vị trí kệ
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 pt-2">
            <p className="text-[length:var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-primary)]">
              {product.price.toLocaleString('vi-VN')}đ
            </p>
            <Button
              variant="primary"
              shape="pill"
              size="md"
              className="flex-1 !px-6"
            >
              Thêm vào giỏ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
