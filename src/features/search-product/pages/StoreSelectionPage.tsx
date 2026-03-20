import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { storeHubService } from '@/shared/services/storeHubService';
import { STORAGE_KEYS } from '@/shared/constants';
import AppHeader from '@/shared/components/common/Header';
import StoreCard from '../components/StoreCard';
import { useNavigate } from 'react-router-dom';
import { useNearbyStores } from '@/features/store-scanner/hooks';
export default function StoreSelectionPage() {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const lastFetchedLocationRef = useRef<string | null>(null);
  const nearbyStoresMutation = useNearbyStores();
  const {
    mutateAsync: fetchNearbyStores,
    data: stores = [],
    isPending: loading,
    error,
  } = nearbyStoresMutation;

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error('Thiết bị không hỗ trợ định vị');
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        toast.error('Không thể lấy vị trí hiện tại');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    const locationKey = `${userLocation.latitude.toFixed(6)}:${userLocation.longitude.toFixed(6)}`;
    if (lastFetchedLocationRef.current === locationKey) return;
    lastFetchedLocationRef.current = locationKey;
    fetchNearbyStores({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      limit: 6,
    });
  }, [fetchNearbyStores, userLocation]);

  const handleSelectStore = async (id: string) => {
    if (!id) {
      toast.error('Không xác định được cửa hàng!');
      return;
    }
    try {
      const order = await storeHubService.createOrder(id);
      if (!order?.id) {
        toast.error('Không tạo được order, vui lòng thử lại!');
        return;
      }
      localStorage.setItem(
        STORAGE_KEYS.ACTIVE_STORE_SESSION,
        JSON.stringify({ storeId: id, orderId: order.id, context: 'online' })
      );
    } catch (_err) {
      toast.error('Có lỗi khi tạo order!');
      return;
    }
    navigate(`/shop/${id}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Đang tải cửa hàng...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
      <AppHeader title="Chọn cửa hàng" showBack={true} />
      <main className="mb-12 flex-1 p-4">
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
            key={store.storeId}
            store={store}
            onSelect={() => handleSelectStore(store.storeId)}
          />
        ))}
      </main>
    </div>
  );
}
