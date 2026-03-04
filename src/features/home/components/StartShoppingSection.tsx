import { QrCode, ShoppingBag } from 'lucide-react';
import type { ReactNode } from 'react';

interface StartShoppingSectionProps {
  onStorePurchase: () => void;
  onOnlinePurchase: () => void;
}

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  onClick: () => void;
  tone?: 'primary' | 'neutral';
}

const ActionCard = ({
  title,
  subtitle,
  icon,
  onClick,
  tone = 'neutral',
}: ActionCardProps) => {
  const isPrimary = tone === 'primary';

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[var(--radius-lg)] p-3 text-left transition-transform active:scale-[0.99]"
      style={{
        background: isPrimary
          ? 'var(--color-primary-gradient)'
          : 'var(--bg-page)',
        border: isPrimary ? 'none' : '1px solid var(--border-default)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)]"
          style={{
            background: isPrimary ? 'rgba(255,255,255,0.22)' : 'var(--bg-card)',
            color: isPrimary ? 'var(--text-inverse)' : 'var(--color-primary)',
          }}
        >
          {icon}
        </div>
        <div>
          <p
            className="text-[length:var(--text-lg)] font-[var(--font-medium)]"
            style={{
              color: isPrimary ? 'var(--text-inverse)' : 'var(--text-primary)',
            }}
          >
            {title}
          </p>
          <p
            className="text-[length:var(--text-sm)]"
            style={{
              color: isPrimary
                ? 'rgba(255,255,255,0.95)'
                : 'var(--text-secondary)',
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </button>
  );
};

export const StartShoppingSection = ({
  onStorePurchase,
  onOnlinePurchase,
}: StartShoppingSectionProps) => {
  return (
    <section className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
      <h3 className="mb-3 text-[length:var(--text-xl)] font-[var(--font-semibold)] text-[var(--text-primary)]">
        Bắt đầu mua sắm
      </h3>
      <div className="space-y-3">
        <ActionCard
          title="Mua tại cửa hàng"
          subtitle="Quét QR & tự thanh toán ngay"
          icon={<QrCode size={20} />}
          onClick={onStorePurchase}
          tone="primary"
        />
        <ActionCard
          title="Mua sắm online"
          subtitle="Giao hàng hoặc đến lấy"
          icon={<ShoppingBag size={20} />}
          onClick={onOnlinePurchase}
        />
      </div>
    </section>
  );
};

export default StartShoppingSection;
