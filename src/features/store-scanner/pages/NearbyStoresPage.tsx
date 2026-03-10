import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocateFixed, MapPin, Navigation, Search } from 'lucide-react';
import { toast } from 'sonner';
import { AppHeader } from '@/shared/components/common/Header';
import { Button } from '@/shared/components/common/Button';
import { ROUTES } from '@/shared/constants/routes';
import { useGoongNearbyMap, useNearbyStores, useScanStore } from '../hooks';
import type { NearbyStore } from '../types';

const GOONG_API_KEY = import.meta.env.VITE_GOONG_API_KEY as string | undefined;
const GOONG_MAP_KEY = import.meta.env.VITE_GOONG_MAP_KEY as string | undefined;

export default function NearbyStoresPage() {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const lastFetchedLocationRef = useRef<string | null>(null);

  const nearbyStoresMutation = useNearbyStores();
  const { mutateAsync: fetchNearbyStores } = nearbyStoresMutation;
  const scanStoreMutation = useScanStore();
  const mapKey = GOONG_MAP_KEY || GOONG_API_KEY;

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
    if (!userLocation) {
      return;
    }

    const locationKey = `${userLocation.latitude.toFixed(6)}:${userLocation.longitude.toFixed(6)}`;
    if (lastFetchedLocationRef.current === locationKey) {
      return;
    }
    lastFetchedLocationRef.current = locationKey;

    fetchNearbyStores({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      limit: 6,
    }).then((stores) => {
      if (stores.length === 0) {
        toast.info('Không tìm thấy cửa hàng gần bạn');
        return;
      }

      setSelectedStoreId(stores[0].storeId);
    });
  }, [fetchNearbyStores, userLocation]);

  const stores = useMemo(
    () => nearbyStoresMutation.data ?? [],
    [nearbyStoresMutation.data]
  );

  const selectedStore = useMemo(() => {
    if (!selectedStoreId) {
      return null;
    }

    return stores.find((store) => store.storeId === selectedStoreId) ?? null;
  }, [selectedStoreId, stores]);

  const filteredStores = useMemo(() => {
    const normalizedKeyword = searchKeyword.trim().toLowerCase();
    if (!normalizedKeyword) {
      return stores;
    }

    return stores.filter((store) => {
      return (
        store.storeName.toLowerCase().includes(normalizedKeyword) ||
        store.address.toLowerCase().includes(normalizedKeyword)
      );
    });
  }, [searchKeyword, stores]);

  const nearestStoreId = useMemo(() => {
    if (stores.length === 0) {
      return null;
    }

    return stores.reduce((nearest, current) => {
      return current.distance < nearest.distance ? current : nearest;
    }).storeId;
  }, [stores]);

  const { mapContainerRef } = useGoongNearbyMap({
    mapKey,
    routeApiKey: GOONG_API_KEY,
    selectedStore,
    userLocation,
  });

  const handleConfirmStore = async () => {
    if (!selectedStore) {
      toast.error('Vui lòng chọn cửa hàng');
      return;
    }

    navigate(ROUTES.SCAN_STORE);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pb-20">
      <AppHeader title="Tìm cửa hàng" />

      <div className="mx-auto space-y-4 px-4 py-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {nearbyStoresMutation.isPending ? (
            <div className="flex h-52 items-center justify-center bg-slate-50">
              <div className="space-y-2 text-center">
                <div className="mx-auto h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-red-500"></div>
                <p className="text-sm text-slate-600">Đang tải bản đồ...</p>
              </div>
            </div>
          ) : GOONG_MAP_KEY || GOONG_API_KEY ? (
            <div ref={mapContainerRef} className="h-[26rem] w-full" />
          ) : (
            <div className="flex h-52 items-center justify-center bg-slate-50 px-4 text-center text-sm text-slate-600">
              <div className="space-y-2">
                <p>⚠️ Không thể hiển thị bản đồ</p>
                <p className="text-xs text-slate-500">
                  Thiếu cấu hình Goong Map Key
                </p>
              </div>
            </div>
          )}

          {selectedStore && (
            <div className="space-y-2 p-3">
              <div className="flex items-center justify-between text-sm">
                <p className="font-semibold text-[var(--text-primary)]">
                  {selectedStore.storeName}
                </p>
                {selectedStore.storeId === nearestStoreId && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                    Gần nhất
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {selectedStore.address}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md bg-blue-50 p-2 text-blue-700">
                  Quãng đường: {selectedStore.distance.toFixed(1)} km
                </div>
                <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
                  Chỉ đường: Trên bản đồ Goong
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Cửa hàng gần bạn
            </p>
            <span className="text-xs text-[var(--text-secondary)]">
              {filteredStores.length} cửa hàng
            </span>
          </div>

          <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <Search size={15} className="text-slate-500" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder="Tìm tên cửa hàng hoặc địa chỉ"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            {filteredStores.map((store: NearbyStore) => {
              const isActive = selectedStoreId === store.storeId;

              return (
                <button
                  type="button"
                  key={store.storeId}
                  onClick={() => setSelectedStoreId(store.storeId)}
                  className={`w-full rounded-xl border p-3 text-left transition ${
                    isActive
                      ? 'border-red-300 bg-red-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {store.storeName}
                    </p>
                    <div className="flex items-center gap-1">
                      {store.storeId === nearestStoreId && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                          Gần nhất
                        </span>
                      )}
                      {isActive && (
                        <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                          Đã chọn
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-[var(--text-secondary)]">
                    <p className="flex items-start gap-1">
                      <MapPin size={13} className="mt-0.5" />
                      <span>{store.address}</span>
                    </p>
                    <p className="flex items-center gap-1 text-blue-600">
                      <Navigation size={13} />
                      {store.distance.toFixed(1)} km
                    </p>
                  </div>
                </button>
              );
            })}

            {!nearbyStoresMutation.isPending && filteredStores.length === 0 && (
              <div className="rounded-lg bg-slate-50 p-3 text-center text-sm text-slate-500">
                Không tìm thấy cửa hàng phù hợp.
              </div>
            )}
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          className="h-14"
          onClick={handleConfirmStore}
          loading={scanStoreMutation.isPending}
          disabled={!selectedStore || nearbyStoresMutation.isPending}
        >
          <div className="flex items-center justify-center gap-2 whitespace-nowrap">
            <LocateFixed size={18} />
            <span className="whitespace-nowrap">Đã đến cửa hàng</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
