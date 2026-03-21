import { formatCurrency } from '@/features/wallet/utils/currency';
import { Wallet } from 'lucide-react';
import { useMemo } from 'react';

interface HomeGreetingCardProps {
  userName: string;
  walletBalance: number | undefined;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const HomeGreetingCard = ({
  userName,
  walletBalance,
}: HomeGreetingCardProps) => {
  const displayBalance = useMemo(
    () => formatCurrency(walletBalance || 0),
    [walletBalance]
  );
  return (
    <section
      className="rounded-[var(--radius-xl)] p-4 text-[var(--text-inverse)]"
      style={{ background: 'var(--color-primary)' }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,255,255,0.22)] text-sm font-[var(--font-semibold)]">
            {getInitials(userName)}
          </div>
          <div>
            <p className="text-bold text-[length:var(--text-sm)] text-[var(--text-white)]">
              Xin chào
            </p>
            <h2 className="text-[length:var(--text-2xl)] leading-[var(--line-height-tight)] font-[var(--font-semibold)] text-[var(--text-white)]">
              {userName}
            </h2>
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] bg-[rgba(255,255,255,0.25)] px-3 py-2 text-right">
          <p className="text-[length:var(--text-xs)] text-[var(--text-white)]">
            Số dư ví
          </p>
          <p className="inline-flex items-center gap-1 text-[length:var(--text-lg)] font-[var(--font-semibold)] text-[var(--text-white)]">
            <Wallet size={14} />
            {displayBalance}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeGreetingCard;
