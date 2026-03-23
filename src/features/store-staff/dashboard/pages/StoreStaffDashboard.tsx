import { useQuery, useQueryClient } from '@tanstack/react-query';
import StoreHeader from '../components/DashboardHeader';
import RevenueCard from '../components/RevenueCard';
import StatCard from '../components/StatCard';
import ActivityList from '../components/ActivityList';
import {
  dashboardService,
  type CountResponse,
  type RevenueResponse,
  type ActivitiesResponse,
} from '../services/dashboardService';
import { db } from '@/core/configs/firebase';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from '@firebase/firestore';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/shared/hooks/useAuth';

const StoreStaffDashboard = () => {
  const { data: revenueData } = useQuery<RevenueResponse>({
    queryKey: ['dashboard-revenue'],
    queryFn: dashboardService.getTodayRevenue,
  });
  const { data: customerData } = useQuery<CountResponse>({
    queryKey: ['dashboard-customer'],
    queryFn: dashboardService.getCurrentCustomerCount,
  });
  const { data: fraudData } = useQuery<CountResponse>({
    queryKey: ['dashboard-fraud'],
    queryFn: dashboardService.getActiveFraudAlertCount,
  });
  const { data: completedData } = useQuery<CountResponse>({
    queryKey: ['dashboard-completed'],
    queryFn: dashboardService.getCompletedOrderCount,
  });
  const { data: pendingDeliveryData } = useQuery<CountResponse>({
    queryKey: ['dashboard-pending-delivery'],
    queryFn: dashboardService.getPendingDeliveryOrderCount,
  });
  const { data: activityData } = useQuery<ActivitiesResponse>({
    queryKey: ['dashboard-activity'],
    queryFn: dashboardService.getRecentActivities,
  });

  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const q = query(collection(db, 'order_events'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const data = change.doc.data();
        if (change.type === 'added') {
          if (
            data.type === 'order_new' &&
            data.order.storeId === user?.store?.id
          ) {
            toast.info(`Đơn hàng mới từ ${data.order.consumer.name}`);
            queryClient.setQueryData(
              ['dashboard-pending-delivery'],
              (old: CountResponse) => ({
                ...old,
                data: { ...old.data, count: old.data.count + 1 },
              })
            );
            queryClient.setQueryData(
              ['dashboard-activity'],
              (old: ActivitiesResponse) => ({
                ...old,
                data: {
                  activities: [
                    {
                      id: data.order.id,
                      type: 'order',
                      name: data.order.consumer.name,
                      description: `Đơn hàng ${data.order.id} - New order`,
                      time: new Date().toLocaleTimeString(),
                    },
                    ...old.data.activities,
                  ],
                },
              })
            );
            await deleteDoc(doc(db, 'order_events', change.doc.id));
          }
        }
      });
    });
    return () => unsubscribe();
  }, [user?.store?.id, queryClient]);

  return (
    <div className="col-span-2 min-h-screen bg-[var(--bg-page)]">
      <StoreHeader />
      <div className="mt-6 space-y-6 px-4">
        <RevenueCard
          revenue={revenueData?.data?.total ?? 0}
          compareToYesterday={revenueData?.data?.compareToYesterday ?? 0}
        />

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Khách trong cửa hàng"
            value={customerData?.data?.count ?? 0}
            tone="blue"
            to="/store-staff/users"
          />
          <StatCard
            title="Quản lý đơn đặt hàng"
            value={pendingDeliveryData?.data?.count ?? 0}
            tone="orange"
            to="/store-staff/orders"
          />
          <StatCard
            title="Cảnh báo gian lận"
            value={fraudData?.data?.count ?? 0}
            tone="red"
            to="/store-staff/fraud-management"
          />
          <StatCard
            title="Đơn hoàn thành"
            value={completedData?.data?.count ?? 0}
            tone="green"
            to="/store-staff/orders?status=completed"
          />
        </div>

        <ActivityList activities={activityData?.data?.activities ?? []} />
      </div>
    </div>
  );
};

export default StoreStaffDashboard;
