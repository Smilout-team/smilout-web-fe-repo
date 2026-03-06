import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, AlertCircle } from 'lucide-react';
import { useProcessPayment } from '../hooks';
import { useWalletBalance } from '@/features/wallet/hooks/useWalletBalance';
import { useOrderItems } from '@/shared/hooks/useOrderItems';
import { ROUTES } from '@/shared/constants/routes';
import { STORAGE_KEYS } from '@/shared/constants';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const processPayment = useProcessPayment();
  const { data: walletData } = useWalletBalance();

  const orderId = useMemo(() => {
    const session = localStorage.getItem(STORAGE_KEYS.ACTIVE_STORE_SESSION);
    if (!session) {
      navigate(ROUTES.HOME);
      return null;
    }
    const { orderId: id } = JSON.parse(session);
    return id;
  }, [navigate]);

  const { data: orderItems } = useOrderItems(orderId);

  const balance = walletData?.balance ?? 0;
  const totalAmount =
    orderItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;
  const isInsufficientBalance = balance < totalAmount;
  const shortage = isInsufficientBalance ? totalAmount - balance : 0;

  const handleProcessPayment = async () => {
    if (!orderId || isInsufficientBalance) return;

    try {
      const session = localStorage.getItem(STORAGE_KEYS.ACTIVE_STORE_SESSION);
      const { storeId } = session ? JSON.parse(session) : { storeId: null };

      await processPayment.mutateAsync({ orderId });

      navigate(ROUTES.CHECKOUT_SUCCESS, {
        state: { storeId, orderId },
      });

      localStorage.removeItem(STORAGE_KEYS.ACTIVE_STORE_SESSION);
    } catch {
      return null;
    }
  };

  const handleTopUp = () => {
    localStorage.setItem(STORAGE_KEYS.CHECKOUT_PENDING_ORDERID, orderId ?? '');
    navigate(ROUTES.WALLET);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  if (!orderItems || !orderId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-gray-500">Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-36">
      <div className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-3 -ml-2 rounded-full p-2 hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">Thanh toán</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-medium text-gray-700">
            Phương thức thanh toán
          </h2>
          <div className="flex items-center justify-between rounded-lg border-2 border-[#FF5252] bg-red-50 p-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#FF5252] p-2">
                <Wallet size={20} className="text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Ví SMILOUT</div>
                <div className="text-sm text-gray-600">
                  Số dư: {formatCurrency(balance)}đ
                </div>
              </div>
            </div>
            <div className="text-orange-500">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
          </div>

          {isInsufficientBalance && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3">
              <AlertCircle size={18} className="mt-0.5 text-red-500" />
              <div className="flex-1">
                <div className="text-sm font-medium text-red-900">
                  Số dư không đủ. Thiếu {formatCurrency(shortage)}đ
                </div>
                <button
                  onClick={handleTopUp}
                  className="mt-1 text-sm font-medium text-red-600 underline"
                >
                  Nạp tiền ngay
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-medium text-gray-700">
            Chi tiết đơn hàng
          </h2>
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div className="text-gray-700">
                  {item.name} x{item.quantity}
                </div>
                <div className="font-medium text-gray-900">
                  {formatCurrency(item.price * item.quantity)}đ
                </div>
              </div>
            ))}
          </div>

          <div className="my-3 border-t border-gray-200" />

          <div className="flex justify-between text-sm">
            <div className="text-gray-700">Tạm tính</div>
            <div className="font-medium text-gray-900">
              {formatCurrency(totalAmount)}đ
            </div>
          </div>

          <div className="mt-3 flex justify-between text-base">
            <div className="font-semibold text-gray-900">Tổng cộng</div>
            <div className="text-lg font-bold text-[#FF5252]">
              {formatCurrency(totalAmount)}đ
            </div>
          </div>
        </div>
      </div>

      <div className="fixed right-0 bottom-16 left-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleProcessPayment}
          disabled={isInsufficientBalance || processPayment.isPending}
          className={`w-full rounded-lg px-4 py-3.5 font-semibold text-white transition-colors ${
            isInsufficientBalance || processPayment.isPending
              ? 'bg-gray-300 text-gray-500'
              : 'bg-[#FF5252] hover:bg-[#FF4444]'
          }`}
        >
          {processPayment.isPending
            ? 'Đang xử lý...'
            : `Xác nhận thanh toán ${formatCurrency(totalAmount)}đ`}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
