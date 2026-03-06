import React, { useState } from 'react';
import FraudFilterHeader from '../components/FraudFilterHeader';
import FraudAlertCard, {
  type FraudAlertData,
} from '../components/FraudAlertCard';

const initialAlerts: FraudAlertData[] = [
  {
    id: '#F002',
    name: 'Nguyễn Văn E',
    phone: '0934567890',
    avatar: '👨',
    type: 'Hành vi nghi ngờ',
    description: 'Hành vi nghi ngờ - lấy sản phẩm nhiều lần',
    location: 'Dãy 3 - Nước giải khát',
    time: '5 phút trước',
    borderColor: 'border-[#eab308]',
    showVideo: true,
    status: 'active',
  },
  {
    id: '#F003',
    name: 'Lê Thị F',
    phone: '0945678901',
    avatar: '👩',
    type: 'Quét sai mã vạch',
    description: 'Quét sai mã vạch - sản phẩm không khớp',
    location: 'Khu vực trả hàng',
    time: '1 phút trước',
    borderColor: 'border-[var(--color-danger)]',
    showVideo: true,
    status: 'active',
  },
];

const FraudManagementPage: React.FC = () => {
  const [alerts, setAlerts] = useState<FraudAlertData[]>(initialAlerts);
  const [currentFilter, setCurrentFilter] = useState<
    'active' | 'processed' | 'all'
  >('active');

  const activeCount = alerts.filter((a) => a.status === 'active').length;
  const processedCount = alerts.filter((a) => a.status === 'processed').length;

  const displayedAlerts = alerts.filter((alert) => {
    if (currentFilter === 'all') return true;
    return alert.status === currentFilter;
  });

  const handleProcess = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: 'processed',
              borderColor: 'border-[var(--color-success)]',
            }
          : alert
      )
    );
  };

  const handleIgnore = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: 'ignored' } : alert
      )
    );
  };

  return (
    <div className="col-span-2 min-h-screen space-y-6 bg-[var(--bg-page)] px-4 py-6">
      <FraudFilterHeader
        activeCount={activeCount}
        processedCount={processedCount}
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />

      <div className="space-y-6">
        {displayedAlerts.map((alert) => (
          <FraudAlertCard
            key={alert.id}
            data={alert}
            onProcess={handleProcess}
            onIgnore={handleIgnore}
          />
        ))}
        {displayedAlerts.length === 0 && (
          <div className="rounded-[var(--radius-card)] bg-[var(--bg-card)] py-10 text-center font-[var(--font-medium)] text-[var(--text-secondary)] shadow-[var(--shadow-card)]">
            Không có cảnh báo nào trong mục này.
          </div>
        )}
      </div>
    </div>
  );
};

export default FraudManagementPage;
