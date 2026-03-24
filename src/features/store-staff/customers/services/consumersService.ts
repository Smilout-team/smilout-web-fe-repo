import { httpClient } from '@/core/api/httpClient.api';
import type { ApiResponse } from '@/core/api/types';

export interface ConsumerInStore {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  checkInTime?: string;
  duration?: string;
  avatarText?: string;
  avatarBgColor?: string;
  avatarTextColor?: string;
  statusDotColor?: string;
}

interface ConsumerInStoreResponse {
  consumer: {
    id: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
  };
  timeStart: string;
}

export const customersService = {
  getConsumersInStore: async (storeId: string): Promise<ConsumerInStore[]> => {
    const res = await httpClient.get<ApiResponse<ConsumerInStoreResponse[]>>(
      `/stores/${storeId}/consumers-in-store`
    );
    return (res.data as Array<ConsumerInStoreResponse>).map((item) => {
      const avatarText = item.consumer.name
        .split(' ')
        .slice(-2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
      const checkInDate = new Date(item.timeStart);
      const now = new Date();
      const diffMs = now.getTime() - checkInDate.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const duration = diffMin > 0 ? `${diffMin} phút` : '<1 phút';
      const checkInTime = isNaN(checkInDate.getTime())
        ? ''
        : checkInDate.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          });
      return {
        ...item.consumer,
        avatarText,
        checkInTime,
        duration,
        avatarBgColor: 'bg-blue-100',
        avatarTextColor: 'text-blue-600',
        statusDotColor: 'bg-green-500',
      };
    });
  },
};
