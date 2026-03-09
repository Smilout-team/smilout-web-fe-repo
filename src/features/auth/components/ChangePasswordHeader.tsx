import { AuthHeader } from '@/shared/components/common/AuthHeader';
import { Key } from 'lucide-react';

export function ChangePasswordHeader() {
  return (
    <AuthHeader
      icon={
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-muted)]">
          <Key
            size={24}
            strokeWidth={1.75}
            className="text-[var(--color-primary)]"
          />
        </div>
      }
      title="Đặt mật khẩu mới"
      description="Mật khẩu mới phải khác với mật khẩu cũ"
      size="sm"
      className="mt-20"
    />
  );
}
export default ChangePasswordHeader;
