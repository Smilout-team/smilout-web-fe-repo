import React, { useState } from 'react';
import AppHeader from '@/shared/components/common/Header';
import StoreCard from '../components/StoreCard';
import { type Store } from '../types/search';
import { useNavigate } from 'react-router-dom';
const mockStores: Store[] = [
  {
    id: '1',
    name: 'CircleK - Nguyễn Huệ',
    address: '123 Nguyễn Huệ, Quận 1',
    distance: 0.5,
    rating: 4.5,
    isSelected: true,
  },
  {
    id: '2',
    name: 'FamilyMart - Lê Lợi',
    address: '456 Lê Lợi, Quận 1',
    distance: 0.8,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Ministop - Pasteur',
    address: '789 Pasteur, Quận 3',
    distance: 1.2,
    rating: 4.3,
  },
];
export default function StoreSelectionPage() {
  const [stores, setStores] = useState<Store[]>(mockStores);
  const navigate = useNavigate();
  const handleSelectStore = (id: string) => {
    setStores((prev) => prev.map((s) => ({ ...s, isSelected: s.id === id })));
    navigate(`/shop/${id}`);
  };
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
      <AppHeader title="Chọn cửa hàng" showBack={true} />
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[length:var(--text-lg)] font-[var(--font-semibold)] text-[var(--text-primary)]">
            Cửa hàng gần bạn
          </p>
          <p className="text-[length:var(--text-sm)] text-[var(--text-secondary)]">
            {stores.length} cửa hàng
          </p>
        </div>
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onSelect={handleSelectStore}
          />
        ))}
      </main>
    </div>
  );
}
