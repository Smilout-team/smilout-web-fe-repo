import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { type Product } from '../types/search';
import Button from '@/shared/components/common/Button';
interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onAddToCart: (e: React.MouseEvent, product: Product) => void;
}
export default function ProductCard({
  product,
  onViewDetail,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      onClick={() => onViewDetail(product)}
      className="flex cursor-pointer flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--shadow-card)] transition-transform active:scale-[0.98]"
    >
      <img
        src={product.imageUrls[0]}
        alt={product.name}
        className="h-32 w-full object-cover"
      />
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <p className="mb-1 line-clamp-2 text-[length:var(--text-md)] font-[var(--font-medium)] text-[var(--text-primary)]">
            {product.name}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-[length:var(--text-lg)] font-[var(--font-bold)] text-[var(--text-primary)]">
            {product.price.toLocaleString('vi-VN')}đ
          </p>
          <Button
            variant="primary"
            shape="pill"
            size="sm"
            className="flex h-8 w-8 items-center justify-center p-0"
            onClick={(e) => onAddToCart(e, product)}
          >
            <ShoppingCart size={16} className="text-[var(--text-inverse)]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
