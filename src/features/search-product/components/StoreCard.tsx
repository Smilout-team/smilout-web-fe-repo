import { MapPin } from 'lucide-react';
import type { NearbyStore } from '@/features/store-scanner/types';
interface StoreCardProps {
  store: NearbyStore;
  onSelect: (id: string) => void;
}
export default function StoreCard({ store, onSelect }: StoreCardProps) {
  return (
    <div
      onClick={() => onSelect(store.storeId)}
      className="mb-4 cursor-pointer rounded-[var(--radius-card)] border bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)] transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[length:var(--text-md)] font-[var(--font-semibold)] text-[var(--text-primary)]">
              {store.storeName}
            </p>
          </div>
          <div className="mb-1 flex items-center gap-2 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
            <MapPin size={16} />
            <span>{store.address}</span>
          </div>
          <div className="flex items-center gap-4 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
            <span>{store.distance.toFixed(1)} km</span>
          </div>
        </div>
      </div>
    </div>
  );
}
