import { ROUTES } from '@/shared/constants/routes';
import type { OrderItem, StoreDetail } from '@/shared/types/storeHub.types';
import { useNavigate } from 'react-router-dom';

interface OnlineCheckoutSuccessViewProps {
  orderId: string;
  currentTime: string;
  storeDetail?: StoreDetail;
  orderItems: OrderItem[];
  paymentData?: {
    subtotalAmount: number;
    deliveryFee: number;
    totalAmount: number;
    deliveryAddress: string | null;
    deliveryOption: 'ASAP' | 'SCHEDULED' | null;
    scheduledDeliveryAt: string | null;
  };
  onComplete: () => void;
}

export function OnlineCheckoutSuccessView({
  orderId,
  currentTime,
  storeDetail,
  orderItems,
  paymentData,
  onComplete,
}: OnlineCheckoutSuccessViewProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f3f4f6] pb-28">
      <div className="bg-[#10b64a] px-4 pt-6 pb-5 text-white">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#10b64a]">
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-center text-2xl font-bold">Đạt hàng thành công!</h1>
        <p className="mt-1 text-center text-sm text-green-100">
          Cám ơn bạn đã sử dụng dịch vụ của SMILOUT
        </p>
      </div>

      <div className="space-y-4 px-3 pt-3">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs text-gray-600">Mã đơn hàng</div>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
              Đơn hàng đã đặt
            </span>
          </div>
          <div className="mb-3 text-sm font-bold text-gray-900">#{orderId}</div>

          <div className="space-y-2 text-sm">
            <div className="text-gray-700">
              <span className="text-gray-500">Cửa hàng:</span>{' '}
              {storeDetail?.storeName ?? 'Đang tải...'}
            </div>
            <div className="text-gray-700">
              <span className="text-gray-500">Thời gian đặt hàng:</span>{' '}
              {currentTime}
            </div>
            <div className="text-gray-700">
              <span className="text-gray-500">Địa chỉ giao hàng:</span>{' '}
              {paymentData?.deliveryAddress ?? 'Chưa có địa chỉ giao hàng'}
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm">
            <div className="text-gray-600">Thời gian giao hàng dự kiến</div>
            <div className="font-semibold text-[#ff5252]">
              {paymentData?.deliveryOption === 'SCHEDULED' &&
              paymentData?.scheduledDeliveryAt
                ? new Date(paymentData.scheduledDeliveryAt).toLocaleString(
                    'vi-VN',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )
                : '~30 phut'}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-gray-800">
            Theo dõi đơn hàng
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-green-500" />
              <div>
                <div className="font-medium text-gray-900">Đơn hàng đã đặt</div>
                <div className="text-xs text-green-600">Hoàn thành</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-gray-300" />
              <div className="text-gray-400">Đang Chuẩn bị hàng</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-gray-300" />
              <div className="text-gray-400">Đang giao hàng</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-gray-300" />
              <div className="text-gray-400">Đã giao</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-gray-800">
            Chi tiết đơn hàng
          </h3>
          <div className="space-y-2">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-700">
                  {item.name} x{item.quantity}
                </span>
                <span className="text-gray-900">
                  {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                </span>
              </div>
            ))}
          </div>

          <div className="my-3 border-t border-gray-200" />

          <div className="space-y-1 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Tạm tính</span>
              <span>
                {(paymentData?.subtotalAmount ?? 0).toLocaleString('vi-VN')}đ
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Phí giao hàng</span>
              <span>
                {(paymentData?.deliveryFee ?? 0).toLocaleString('vi-VN')}đ
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 text-base font-semibold text-[#ff5252]">
              <span>Tổng cộng</span>
              <span>
                {(paymentData?.totalAmount ?? 0).toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (storeDetail?.contactPhone) {
              window.location.href = `tel:${storeDetail.contactPhone}`;
            }
          }}
          className="w-full rounded-lg border border-[#ff5252] bg-white py-3 font-semibold text-[#ff5252]"
        >
          Liên hệ cửa hàng
        </button>

        <button
          onClick={() => navigate(ROUTES.ORDER_HISTORY)}
          className="w-full rounded-lg bg-[#ff5252] py-3 font-semibold text-white"
        >
          Xem đơn hàng của tôi
        </button>

        <button
          onClick={onComplete}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-700"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
}
