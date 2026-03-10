import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  MapPin,
  Navigation,
  Package,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/shared/components/common/Button';
import { ROUTES } from '@/shared/constants/routes';
import { STORAGE_KEYS } from '@/shared/constants';
import type {
  RepurchaseOrderResponse,
  StoreRecommendation,
} from '../types/order';
import { useCreateCartFromStore, useRepurchaseRecommendations } from '../hooks';

export default function StoreRecommendationsPage() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [data, setData] = useState<RepurchaseOrderResponse | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const recommendationsMutation = useRepurchaseRecommendations();
  const { mutateAsync: fetchRecommendations } = recommendationsMutation;
  const createCartMutation = useCreateCartFromStore();

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        toast.error('Không thể lấy vị trí của bạn');
      }
    );
  }, []);

  useEffect(() => {
    if (!orderId) return;

    fetchRecommendations({
      orderId,
      userLatitude: userLocation?.latitude,
      userLongitude: userLocation?.longitude,
    })
      .then(setData)
      .catch((error: unknown) => {
        toast.error(
          error instanceof Error && error.message
            ? error.message
            : 'Không thể tải đề xuất cửa hàng'
        );
      });
  }, [orderId, fetchRecommendations, userLocation]);

  const getRecommendationBadge = (recommendation: string) => {
    const styles = {
      best: 'bg-green-100 text-green-700 border-green-300',
      good: 'bg-blue-100 text-blue-700 border-blue-300',
      alternative: 'bg-gray-100 text-gray-700 border-gray-300',
    };

    const labels = {
      best: 'Tốt nhất',
      good: 'Tốt',
      alternative: 'Thay thế',
    };

    return (
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
          styles[recommendation as keyof typeof styles] ||
          'bg-gray-100 text-gray-700'
        }`}
      >
        {labels[recommendation as keyof typeof labels] || recommendation}
      </span>
    );
  };

  const getPriceDifference = (totalPrice: number, baselinePrice: number) => {
    const diff = totalPrice - baselinePrice;
    const percentage = baselinePrice > 0 ? (diff / baselinePrice) * 100 : 0;

    return {
      diff,
      percentage,
      isCheaper: diff < 0,
    };
  };

  const handleSelectStore = async (storeId: string) => {
    try {
      if (!orderId) {
        toast.error('Không xác định được đơn hàng cần mua lại');
        return;
      }

      const session = await createCartMutation.mutateAsync({
        sourceOrderId: orderId,
        targetStoreId: storeId,
      });

      localStorage.setItem(
        STORAGE_KEYS.ACTIVE_STORE_SESSION,
        JSON.stringify({
          storeId: session.storeId,
          orderId: session.orderId,
          context: 'online',
        })
      );

      if (session.addedItemsCount === 0) {
        toast.error('Không có sản phẩm phù hợp để thêm vào giỏ hàng');
      } else {
        toast.success(
          `Đã thêm ${session.addedItemsCount} sản phẩm vào giỏ hàng`
        );
      }

      navigate(ROUTES.CART, {
        state: {
          storeId: session.storeId,
          orderId: session.orderId,
        },
      });
    } catch {
      toast.error('Không thể tạo giỏ hàng cho cửa hàng này');
    }
  };

  const isLoading = recommendationsMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-page)]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--color-primary)]" />
          <p className="text-gray-600">Đang tìm cửa hàng tốt nhất...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-page)]">
        <div className="text-center">
          <Package size={48} className="mx-auto mb-3 text-gray-400" />
          <p className="text-gray-500">Không tìm thấy đơn hàng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-3">
          <div className="mb-2 flex items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mr-3 rounded-lg p-1.5 hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="flex-1 pr-12 text-center text-lg font-semibold">
              Gợi ý cửa hàng
            </h1>
          </div>
          <p className="ml-11 text-sm text-gray-600">
            Mua lại {data.productCount} sản phẩm từ{' '}
            <span className="font-medium">{data.originalStoreName}</span>
          </p>
        </div>
      </div>

      <div className="space-y-4 p-4 pb-24">
        {data.storeRecommendations.length === 0 ? (
          <div className="py-12 text-center">
            <Package size={48} className="mx-auto mb-3 text-gray-400" />
            <p className="text-gray-500">
              Không tìm thấy cửa hàng có sản phẩm tương tự
            </p>
          </div>
        ) : (
          data.storeRecommendations.map((store: StoreRecommendation) => {
            const priceDiff = getPriceDifference(
              store.totalPrice,
              store.totalOriginalPrice
            );

            return (
              <div
                key={store.storeId}
                className={`rounded-xl border bg-white p-4 shadow-sm ${
                  store.recommendation === 'best'
                    ? 'border-green-300 ring-2 ring-green-200'
                    : 'border-gray-200'
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1.5 flex items-center gap-2">
                      <h3 className="text-base font-semibold">
                        {store.storeName}
                      </h3>
                      {getRecommendationBadge(store.recommendation)}
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-gray-600">
                      <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                      <span>{store.address}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-blue-50 p-2.5 text-center">
                    <Navigation
                      size={16}
                      className="mx-auto mb-1 text-blue-600"
                    />
                    <p className="text-xs text-gray-600">Khoảng cách</p>
                    <p className="text-sm font-semibold text-blue-700">
                      {store.distance !== null
                        ? `${store.distance.toFixed(1)} km`
                        : 'N/A'}
                    </p>
                  </div>

                  <div className="rounded-lg bg-emerald-50 p-2.5 text-center">
                    <Package
                      size={16}
                      className="mx-auto mb-1 text-emerald-600"
                    />
                    <p className="text-xs text-gray-600">Có sẵn</p>
                    <p className="text-sm font-semibold text-emerald-700">
                      {store.availabilityRate.toFixed(0)}%
                    </p>
                  </div>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tổng giá</span>
                    <span className="text-lg font-bold text-gray-900">
                      {store.totalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  {priceDiff.diff !== 0 && (
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        priceDiff.isCheaper ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {priceDiff.isCheaper ? (
                        <TrendingDown size={14} />
                      ) : (
                        <TrendingUp size={14} />
                      )}
                      <span>
                        {priceDiff.isCheaper ? 'Rẻ hơn' : 'Đắt hơn'}{' '}
                        {Math.abs(priceDiff.diff).toLocaleString('vi-VN')}đ ({' '}
                        {Math.abs(priceDiff.percentage).toFixed(1)}%)
                      </span>
                    </div>
                  )}
                </div>

                {store.unavailableProducts.length > 0 && (
                  <div className="mb-3 rounded-lg bg-yellow-50 p-2.5">
                    <p className="mb-1 text-xs font-medium text-yellow-800">
                      Không có sẵn:
                    </p>
                    <p className="text-xs text-yellow-700">
                      {store.unavailableProducts.join(', ')}
                    </p>
                  </div>
                )}

                <Button
                  onClick={() => handleSelectStore(store.storeId)}
                  loading={createCartMutation.isPending}
                  className={`w-full ${
                    store.recommendation === 'best'
                      ? 'bg-green-600 hover:bg-green-700'
                      : ''
                  }`}
                >
                  Chọn cửa hàng này
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
