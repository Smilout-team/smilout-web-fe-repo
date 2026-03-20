import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { debounce } from 'lodash';

import {
  CheckoutHeader,
  CheckoutSubmitBar,
  DeliveryAddressSection,
  DeliveryOptionSection,
  OrderSummarySection,
  PaymentMethodCard,
} from '../components';
import {
  useDeliveryAddressOptions,
  useProcessPayment,
  useSearchDeliveryAddresses,
} from '../hooks';
import type { DeliveryAddressOption } from '../types';
import { getSelectedDeliveryAddress } from '../utils/deliveryAddress.util';
import { useWalletBalance } from '@/features/wallet/hooks/useWalletBalance';
import { useOrderItems } from '@/shared/hooks/useOrderItems';
import { useStoreDetail } from '@/shared/hooks/useStoreDetail';
import { ROUTES } from '@/shared/constants/routes';
import { STORAGE_KEYS } from '@/shared/constants';
import { useAuth } from '@/shared/hooks/useAuth';
import { validatePhoneNumberWithAbstractAPI } from '@/shared/utils/validatePhone';
import formatErrorMessage from '@/shared/utils/formatErrorMessage';

export const CheckoutPage = () => {
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const processPayment = useProcessPayment();
  const { data: walletData } = useWalletBalance();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState(
    user?.phoneNumber ?? ''
  );
  const [deliveryOption, setDeliveryOption] = useState<'ASAP' | 'SCHEDULED'>(
    'ASAP'
  );
  const [scheduledDeliveryAt, setScheduledDeliveryAt] = useState('');
  const [addressKeyword, setAddressKeyword] = useState('');
  const [debouncedAddressKeyword, setDebouncedAddressKeyword] = useState('');
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(() => {
    const stored = localStorage.getItem('USER_LOCATION');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  const sessionData = useMemo(() => {
    const session = localStorage.getItem(STORAGE_KEYS.ACTIVE_STORE_SESSION);
    if (!session) {
      navigate(ROUTES.HOME);
      return null;
    }
    return JSON.parse(session) as {
      orderId: string;
      storeId: string;
      context?: 'in_store' | 'online';
    };
  }, [navigate]);

  const debounceValidatePhone = useMemo(
    () =>
      debounce(async (nextValue: string) => {
        const valid = await validatePhoneNumberWithAbstractAPI(nextValue);
        return valid ? null : 'Số điện thoại không hợp lệ';
      }, 1000),
    []
  );

  const orderId = sessionData?.orderId ?? null;
  const isOnlineDelivery = sessionData?.context === 'online';

  const { data: storeDetail } = useStoreDetail(sessionData?.storeId ?? null);

  const { data: orderItems } = useOrderItems(orderId);

  const { data: deliveryAddressOptions = [] } = useDeliveryAddressOptions(
    userLocation?.latitude,
    userLocation?.longitude
  );

  const {
    data: searchedAddressOptions = [],
    isFetching: isSearchingAddresses,
  } = useSearchDeliveryAddresses(
    debouncedAddressKeyword,
    userLocation?.latitude,
    userLocation?.longitude
  );

  const combinedAddressOptions = useMemo(() => {
    if (debouncedAddressKeyword.trim().length < 2) {
      return deliveryAddressOptions;
    }

    return searchedAddressOptions;
  }, [debouncedAddressKeyword, deliveryAddressOptions, searchedAddressOptions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAddressKeyword(addressKeyword.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [addressKeyword]);

  const defaultAddressId = useMemo(() => {
    if (deliveryAddressOptions.length === 0) {
      return null;
    }

    return (
      deliveryAddressOptions.find((option) => option.isDefault)?.id ??
      deliveryAddressOptions[0].id
    );
  }, [deliveryAddressOptions]);

  const activeSelectedAddressId = selectedAddressId ?? defaultAddressId;

  function haversineDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371e3;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  useEffect(() => {
    if (!isOnlineDelivery || !navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLoc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const stored = localStorage.getItem('USER_LOCATION');
        let shouldUpdate = false;
        if (stored) {
          try {
            const oldLoc = JSON.parse(stored);
            const dist = haversineDistance(
              oldLoc.latitude,
              oldLoc.longitude,
              newLoc.latitude,
              newLoc.longitude
            );
            if (dist > 200) shouldUpdate = true;
          } catch {
            shouldUpdate = true;
          }
        } else {
          shouldUpdate = true;
        }
        if (shouldUpdate) {
          setUserLocation(newLoc);
          localStorage.setItem('USER_LOCATION', JSON.stringify(newLoc));
        }
      },
      () => {
        toast.error('Không thể lấy vị trí hiện tại để tính phí giao hàng');
      }
    );
  }, [isOnlineDelivery]);

  const balance = walletData?.balance ?? 0;
  const subtotalAmount =
    orderItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;

  const selectedAddress = useMemo(() => {
    return (
      combinedAddressOptions.find(
        (option: DeliveryAddressOption) => option.id === activeSelectedAddressId
      ) ??
      deliveryAddressOptions.find(
        (option: DeliveryAddressOption) => option.id === activeSelectedAddressId
      ) ??
      null
    );
  }, [activeSelectedAddressId, combinedAddressOptions, deliveryAddressOptions]);

  const deliveryFee = useMemo(() => {
    if (!isOnlineDelivery || !storeDetail?.coordinate) {
      return 0;
    }

    const targetLatitude = selectedAddress?.latitude ?? userLocation?.latitude;
    const targetLongitude =
      selectedAddress?.longitude ?? userLocation?.longitude;

    if (targetLatitude === undefined || targetLongitude === undefined) {
      return 0;
    }

    const storeCoordinates = parseCoordinates(storeDetail.coordinate);
    if (!storeCoordinates) {
      return 0;
    }

    const distance = calculateDistance(
      targetLatitude,
      targetLongitude,
      storeCoordinates.lat,
      storeCoordinates.lng
    );

    if (distance < 3) {
      return 0;
    }

    if (distance <= 5) {
      return 15000;
    }

    return 15000 + Math.ceil(distance - 5) * 3000;
  }, [isOnlineDelivery, selectedAddress, storeDetail, userLocation]);

  const totalAmount = subtotalAmount + deliveryFee;
  const isInsufficientBalance = balance < totalAmount;
  const shortage = isInsufficientBalance ? totalAmount - balance : 0;

  const handleProcessPayment = async () => {
    if (!orderId || isInsufficientBalance) return;

    if (isOnlineDelivery && !userLocation) {
      toast.error('Cần bật vị trí để tính phí giao hàng trước khi thanh toán');
      return;
    }

    if (isOnlineDelivery && !selectedAddress) {
      toast.error('Vui lòng chọn địa chỉ giao hàng');
      return;
    }

    if (deliveryOption === 'SCHEDULED' && !scheduledDeliveryAt) {
      toast.error('Vui lòng chọn thời gian hẹn giao hàng');
      return;
    }

    if (isOnlineDelivery && deliveryPhoneNumber === '') {
      setDeliveryPhoneNumber(user?.phoneNumber ?? '');
    }

    try {
      const session = localStorage.getItem(STORAGE_KEYS.ACTIVE_STORE_SESSION);
      const { storeId } = session ? JSON.parse(session) : { storeId: null };

      const paymentData = await processPayment.mutateAsync({
        orderId,
        deliveryAddress:
          getSelectedDeliveryAddress(selectedAddress) ??
          storeDetail?.address ??
          'Chưa có địa chỉ',
        deliveryOption,
        scheduledDeliveryAt:
          deliveryOption === 'SCHEDULED'
            ? new Date(scheduledDeliveryAt).toISOString()
            : undefined,
        userLatitude: isOnlineDelivery
          ? (selectedAddress?.latitude ?? userLocation?.latitude)
          : undefined,
        userLongitude: isOnlineDelivery
          ? (selectedAddress?.longitude ?? userLocation?.longitude)
          : undefined,
        deliveryPhoneNumber: isOnlineDelivery ? deliveryPhoneNumber : undefined,
      });

      navigate(ROUTES.CHECKOUT_SUCCESS, {
        state: {
          storeId,
          orderId,
          context: isOnlineDelivery ? 'online' : 'in_store',
          paymentData,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? formatErrorMessage(error.message)
          : 'Thanh toán không thành công';
      toast.error(message);
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
      <CheckoutHeader onBack={() => navigate(-1)} />

      <div className="px-4 py-4">
        <PaymentMethodCard
          balance={balance}
          isInsufficientBalance={isInsufficientBalance}
          shortage={shortage}
          onTopUp={handleTopUp}
          formatCurrency={formatCurrency}
        />

        {isOnlineDelivery && (
          <>
            <DeliveryAddressSection
              addressKeyword={addressKeyword}
              onChangeKeyword={setAddressKeyword}
              options={combinedAddressOptions}
              selectedAddressId={activeSelectedAddressId}
              isSearching={isSearchingAddresses}
              onSelectAddress={setSelectedAddressId}
            />

            <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Số điện thoại người nhận
              </label>
              <input
                type="tel"
                value={deliveryPhoneNumber}
                onChange={async (e) => {
                  const value = e.target.value;
                  setDeliveryPhoneNumber(value);
                  if (value.length >= 10 && value.length <= 15) {
                    const error = await debounceValidatePhone(value);
                    if (error) {
                      setPhoneError(error);
                    }
                  } else {
                    setPhoneError(null);
                  }
                }}
                placeholder={`Số điện thoại mặc định của bạn là ${user?.phoneNumber ?? 'Nhập số điện thoại người nhận'}`}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                maxLength={15}
              />
              {isOnlineDelivery && phoneError && (
                <div className="mt-2 text-xs text-red-500">{phoneError}</div>
              )}
            </div>

            <DeliveryOptionSection
              deliveryOption={deliveryOption}
              scheduledDeliveryAt={scheduledDeliveryAt}
              onChangeDeliveryOption={setDeliveryOption}
              onChangeScheduledAt={setScheduledDeliveryAt}
            />
          </>
        )}

        <OrderSummarySection
          orderItems={orderItems}
          subtotalAmount={subtotalAmount}
          deliveryFee={deliveryFee}
          totalAmount={totalAmount}
          isOnlineDelivery={isOnlineDelivery}
          formatCurrency={formatCurrency}
        />
      </div>

      <CheckoutSubmitBar
        onSubmit={handleProcessPayment}
        disabled={isInsufficientBalance || processPayment.isPending}
        isPending={processPayment.isPending}
        totalAmount={totalAmount}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default CheckoutPage;

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function parseCoordinates(
  coordinate: string
): { lat: number; lng: number } | null {
  const pointMatch = coordinate.match(/POINT\(([^ ]+) ([^ ]+)\)/);
  if (pointMatch) {
    return {
      lng: parseFloat(pointMatch[1]),
      lat: parseFloat(pointMatch[2]),
    };
  }

  const parts = coordinate.split(',');
  if (parts.length === 2) {
    return {
      lat: parseFloat(parts[0].trim()),
      lng: parseFloat(parts[1].trim()),
    };
  }

  return null;
}
