import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  InStoreCheckoutSuccessView,
  OnlineCheckoutSuccessView,
} from '../components';
import { useStoreDetail } from '@/shared/hooks/useStoreDetail';
import { useOrderItems } from '@/shared/hooks/useOrderItems';
import { ROUTES } from '@/shared/constants/routes';
import { STORAGE_KEYS } from '@/shared/constants';

export const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(60);

  const routeState = location.state as Partial<{
    storeId: string;
    orderId: string;
    context: 'online' | 'in_store';
    paymentData: {
      subtotalAmount: number;
      deliveryFee: number;
      totalAmount: number;
      deliveryAddress: string | null;
      deliveryOption: 'ASAP' | 'SCHEDULED' | null;
      scheduledDeliveryAt: string | null;
    };
  }> | null;

  const storeId = useMemo(() => {
    if (routeState?.storeId) {
      if (routeState.orderId) {
        localStorage.setItem('lastOrderId', routeState.orderId);
      }
      return routeState.storeId;
    }

    const session = localStorage.getItem(STORAGE_KEYS.ACTIVE_STORE_SESSION);
    if (session) {
      try {
        const { storeId: id, orderId } = JSON.parse(session);
        localStorage.setItem('lastOrderId', orderId);
        return id;
      } catch {
        return null;
      }
    }

    return null;
  }, [routeState]);

  const {
    data: storeDetail,
    isLoading,
    isError,
    error,
  } = useStoreDetail(storeId);

  const orderId = localStorage.getItem('lastOrderId') || '841850';
  const { data: orderItems } = useOrderItems(orderId);
  const isOnlineFlow = routeState?.context === 'online';

  const handleComplete = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_STORE_SESSION);
    localStorage.removeItem('lastOrderId');
    navigate(ROUTES.HOME);
  }, [navigate]);

  useEffect(() => {
    if (isOnlineFlow) {
      return;
    }

    if (countdown <= 0) {
      handleComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, handleComplete, isOnlineFlow]);

  const currentTime = new Date().toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isOnlineFlow) {
    return (
      <OnlineCheckoutSuccessView
        orderId={orderId}
        currentTime={currentTime}
        storeDetail={storeDetail ?? undefined}
        orderItems={orderItems ?? []}
        paymentData={routeState?.paymentData}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <InStoreCheckoutSuccessView
      orderId={orderId}
      countdown={countdown}
      currentTime={currentTime}
      storeDetail={storeDetail ?? undefined}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error instanceof Error ? error.message : undefined}
      onComplete={handleComplete}
    />
  );
};

export default CheckoutSuccessPage;
