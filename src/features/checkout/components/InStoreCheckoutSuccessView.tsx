import type { StoreDetail } from '@/shared/types/storeHub.types';

interface InStoreCheckoutSuccessViewProps {
  orderId: string;
  countdown: number;
  currentTime: string;
  storeDetail?: StoreDetail;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onComplete: () => void;
}

export function InStoreCheckoutSuccessView({
  orderId,
  countdown,
  currentTime,
  storeDetail,
  isLoading,
  isError,
  errorMessage,
  onComplete,
}: InStoreCheckoutSuccessViewProps) {
  return (
    <div className="mb-24 min-h-screen bg-gray-50">
      <div className="bg-green-500 px-4 py-8 text-center text-white">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <svg
            className="h-10 w-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold">Thanh toán thành công!</h1>
        <p className="mt-1 text-sm text-green-100">
          Cám ơn bạn đã sử dụng dịch vụ của SMILOUT
        </p>
      </div>

      <div className="px-4 pt-6 pb-24">
        <div className="mb-4 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-center text-sm font-medium text-gray-700">
            Mã rời khỏi cửa hàng
          </h2>
          <p className="mb-4 text-center text-xs text-gray-500">
            Quét mã QR để rời khỏi cửa hàng
          </p>

          <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-lg border-2 border-gray-200 bg-white">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="200" height="200" fill="white" />
              <g fill="#EF4444">
                <rect x="20" y="20" width="50" height="50" />
                <rect x="130" y="20" width="50" height="50" />
                <rect x="20" y="130" width="50" height="50" />
                <rect x="90" y="40" width="15" height="15" />
                <rect x="110" y="40" width="15" height="15" />
                <rect x="50" y="90" width="15" height="15" />
                <rect x="70" y="90" width="15" height="15" />
                <rect x="90" y="90" width="15" height="15" />
                <rect x="110" y="90" width="15" height="15" />
                <rect x="130" y="90" width="15" height="15" />
                <rect x="150" y="90" width="15" height="15" />
                <rect x="90" y="110" width="15" height="15" />
                <rect x="130" y="110" width="15" height="15" />
                <rect x="70" y="130" width="15" height="15" />
                <rect x="110" y="130" width="15" height="15" />
                <rect x="150" y="130" width="15" height="15" />
                <rect x="90" y="150" width="15" height="15" />
                <rect x="130" y="150" width="15" height="15" />
              </g>
            </svg>
          </div>

          <div className="text-center">
            <div className="mb-1 text-2xl font-bold text-gray-900">
              {orderId}
            </div>
            <span className="text-xs font-medium text-[#FF5252] underline">
              Mã có hiệu lực: {countdown}s
            </span>
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Hóa đơn điện tử
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Mã đơn hàng</span>
              <span className="font-medium text-gray-900">{orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Thời gian</span>
              <span className="font-medium text-gray-900">{currentTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cửa hàng</span>
              <span className="font-medium text-gray-900">
                {isLoading
                  ? 'Dang tai...'
                  : isError
                    ? `Loi tai (${errorMessage})`
                    : (storeDetail?.storeName ?? 'Khong co thong tin')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed right-0 bottom-16 left-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <button
          onClick={onComplete}
          className="w-full rounded-lg bg-[#FF5252] px-4 py-3.5 font-semibold text-white transition-colors hover:bg-[#FF4444]"
        >
          Hoàn tất và về trang chủ
        </button>
      </div>
    </div>
  );
}
