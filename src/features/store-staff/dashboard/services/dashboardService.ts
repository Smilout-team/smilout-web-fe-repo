export type CountResponse = { data: { count: number } };
export type RevenueResponse = {
  data: { total: number; compareToYesterday: number };
};
import { type Activity } from '../components/ActivityList';
export type ActivitiesResponse = { data: { activities: Activity[] } };

import { httpClient } from '@/core/api/httpClient.api';

export const dashboardService = {
  getTodayRevenue: (): Promise<RevenueResponse> =>
    httpClient.get('/orders/staff/revenue/today'),
  getCurrentCustomerCount: (): Promise<CountResponse> =>
    httpClient.get('/orders/staff/customers/current'),
  getActiveFraudAlertCount: (): Promise<CountResponse> =>
    httpClient.get('/orders/staff/fraud-alerts/count'),
  getCompletedOrderCount: (): Promise<CountResponse> =>
    httpClient.get('/orders/staff/orders/count/completed'),
  getPendingDeliveryOrderCount: (): Promise<CountResponse> =>
    httpClient.get('/orders/staff/orders/count/pending-delivery'),
  getRecentActivities: (): Promise<ActivitiesResponse> =>
    httpClient.get('/orders/staff/activities/recent'),
};
