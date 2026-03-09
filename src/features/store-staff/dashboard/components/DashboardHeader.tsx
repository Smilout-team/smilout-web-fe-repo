import { User, LogOut } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <div className="bg-[var(--color-primary)] p-6 text-[var(--text-on-primary)] shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <User size={20} className="text-[var(--text-on-primary)]" />
          </div>

          <div>
            <p className="text-lg font-semibold text-[var(--text-on-primary)]">
              Kim Hân
            </p>

            <p className="text-sm text-[var(--text-on-primary)] opacity-90">
              Store staff
            </p>
          </div>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white/20 transition hover:bg-white/30">
          <LogOut size={18} className="text-[var(--text-on-primary)]" />
        </button>
      </div>

      <div className="mt-6 flex justify-between rounded-[var(--radius-card)] bg-white/20 p-4 text-sm">
        <div>
          <p className="text-[var(--text-on-primary)] opacity-80">Cửa hàng</p>

          <p className="font-medium text-[var(--text-on-primary)]">
            Circle K - Nguyễn Huệ
          </p>
        </div>

        <div className="text-right">
          <p className="text-[var(--text-on-primary)] opacity-80">
            Mã cửa hàng
          </p>

          <p className="font-medium text-[var(--text-on-primary)]">CK001</p>
        </div>
      </div>
    </div>
  );
}
