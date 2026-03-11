import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { type Store } from '../types/search';
import Tag from '@/shared/components/common/Tag';
import clsx from 'clsx';
interface StoreCardProps {
  store: Store;
  onSelect: (id: string) => void;
}
export default function StoreCard({ store, onSelect }: StoreCardProps) {
  return (
    <div
      onClick={() => onSelect(store.id)}
      className={clsx(
        'mb-4 cursor-pointer rounded-[var(--radius-card)] border bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)] transition-all',
        store.isSelected
          ? 'border-[var(--color-primary)]'
          : 'border-[var(--border-default)]'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Nút Radio y chang Figma */}
        <div className="mt-1">
          <div
            className={clsx(
              'flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all',
              store.isSelected
                ? 'border-[var(--color-primary)]'
                : 'border-[var(--border-muted)]'
            )}
          >
            {store.isSelected && (
              <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[length:var(--text-md)] font-[var(--font-semibold)] text-[var(--text-primary)]">
              {store.name}
            </p>
            {store.isSelected && (
              <Tag tone="red" variant="solid" rounded="full" size="sm">
                Đã chọn
              </Tag>
            )}
          </div>
          <div className="mb-1 flex items-center gap-2 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
            <MapPin size={16} />
            <span>{store.address}</span>
          </div>
          <div className="flex items-center gap-4 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
            <span>{store.distance.toFixed(1)} km</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} className="fill-amber-500" />
              <span className="font-[var(--font-medium)]">
                {store.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
