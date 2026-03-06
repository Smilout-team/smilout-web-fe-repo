import StoreHeader from '@/features/store-staff/dashboard/components/DashboardHeader';
import RevenueCard from '@/features/store-staff/dashboard/components/RevenueCard';
import StatCard from '@/features/store-staff/dashboard/components/StatCard';
import ActivityList from '@/features/store-staff/dashboard/components/ActivityList';

export default function StoreStaffDashboard() {
  return (
    <div className="col-span-2 min-h-screen space-y-6 bg-[var(--bg-page)] px-4">
      <StoreHeader />

      <RevenueCard />

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Khách trong cửa hàng"
          value={12}
          tone="blue"
          to="/store-staff/users"
        />
        <StatCard
          title="Quản lý đơn đặt hàng"
          value={5}
          tone="orange"
          to="/store-staff/orders"
        />
        <StatCard
          title="Cảnh báo gian lận"
          value={2}
          tone="red"
          to="/store-staff/fraud-management"
        />
        <StatCard
          title="Đơn hoàn thành"
          value={47}
          tone="green"
          to="/store-staff/completed-orders"
        />
      </div>

      <ActivityList />
    </div>
  );
}
