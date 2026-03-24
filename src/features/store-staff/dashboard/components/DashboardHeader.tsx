import { useAuth } from '@/shared/hooks/useAuth';
import { User, LogOut } from 'lucide-react';

export default function DashboardHeader() {
  const { user, signOut } = useAuth();
  return (
    <div className="bg-[var(--color-primary)] p-6 text-[var(--text-on-primary)] shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <User size={20} className="text-[var(--text-on-primary)]" />
          </div>

          <div>
            <p className="text-lg font-semibold text-[var(--color-white)]">
              {user?.name}
            </p>

            <p className="text-sm text-[var(--color-white)] opacity-90">
              Store staff
            </p>
          </div>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white/20 transition hover:bg-white/30"
          onClick={signOut}
        >
          <LogOut size={18} className="text-[var(--text-on-primary)]" />
        </button>
      </div>

      <div className="mt-6 flex justify-between rounded-[var(--radius-card)] bg-white/85 p-4 text-sm">
        <div>
          <p className="text-[var(--text-primary)] opacity-80">Cửa hàng</p>

          <p className="font-medium text-[var(--text-primary)]">
            {user?.store?.storeName || ''}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[var(--text-primary)] opacity-80">Mã cửa hàng</p>

          <p className="font-medium text-[var(--text-primary)]">
            {user?.store?.id || 'CK001'}
          </p>
        </div>
      </div>
    </div>
  );
}
