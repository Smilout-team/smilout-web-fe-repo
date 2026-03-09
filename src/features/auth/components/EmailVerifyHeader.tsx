import { AuthHeader } from '@/shared/components/common/AuthHeader';
import { Key } from 'lucide-react';

export function EmailVerifyHeader() {
  return (
    <AuthHeader
      icon={
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-muted)]">
          <Key
            size={24}
            strokeWidth={2}
            className="text-[var(--text-primary)]"
          />
        </div>
      }
      title="Nhập mã xác thực"
      description="Chúng tôi đã gửi mã 6 chữ số đến vu***@gmail.com"
      size="sm"
      className="mt-8"
    />
  );
}
export default EmailVerifyHeader;

/* <AppHeader title="Xác thực OTP" showBack /> */
