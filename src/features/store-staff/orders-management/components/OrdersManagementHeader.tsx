import ReturnButton from '@/shared/components/common/ReturnButton';
import OrderTabs from './OrderTabs';

interface Props {
  total: number;
  activeTab: string;
  counts: Record<string, number>;
  onChangeTab: (tab: string) => void;
}

export default function OrdersManagementHeader({
  total,
  activeTab,
  counts,
  onChangeTab,
}: Props) {
  return (
    <div className="bg-[var(--color-primary)] px-4 pt-5 pb-6 text-white">
      <div className="mb-3 flex items-center gap-3">
        <ReturnButton variant="web" className="bg-white/20 hover:bg-white/30" />

        <div>
          <p className="text-lg font-semibold text-[var(--color-white)]">
            Quản lý đơn hàng
          </p>
          <p className="text-solid text-sm text-[var(--color-white)] opacity-90">
            {total} đơn hàng
          </p>
        </div>
      </div>

      <OrderTabs active={activeTab} counts={counts} onChange={onChangeTab} />
    </div>
  );
}
