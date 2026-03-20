import { useQuery } from '@tanstack/react-query';
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

  return (
    <div className="col-span-2 min-h-screen space-y-6 bg-[var(--bg-page)] px-4">
      <StoreHeader />

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
  );
};

export default StoreStaffDashboard;
