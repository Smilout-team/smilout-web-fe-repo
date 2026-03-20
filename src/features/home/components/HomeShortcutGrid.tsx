import { QrCode, Receipt, Wallet } from 'lucide-react';
import type { ReactNode } from 'react';

interface HomeShortcutGridProps {
  onFindStore: () => void;
  onOrders: () => void;
  onWallet: () => void;
}

interface ShortcutItemProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

const ShortcutItem = ({ label, icon, onClick }: ShortcutItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-20 flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-page)] text-[var(--color-primary)]">
        {icon}
      </span>
      <span className="text-[length:var(--text-sm)] font-[var(--font-medium)]">
        {label}
      </span>
    </button>
  );
};

export const HomeShortcutGrid = ({
  onFindStore,
  onOrders,
  onWallet,
}: HomeShortcutGridProps) => {
  return (
    <section className="grid grid-cols-3 gap-3">
      <ShortcutItem
        label="Tìm cửa hàng"
        icon={<QrCode size={18} />}
        onClick={onFindStore}
      />
      <ShortcutItem
        label="Đơn hàng"
        icon={<Receipt size={18} />}
        onClick={onOrders}
      />
      <ShortcutItem
        label="Nạp tiền"
        icon={<Wallet size={18} />}
        onClick={onWallet}
      />
    </section>
  );
};

export default HomeShortcutGrid;
