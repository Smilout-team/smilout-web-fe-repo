import { AuthHeader } from '@/shared/components/common/AuthHeader';
import { Mail } from 'lucide-react';

export function ForgotPasswordHeader() {
  return (
    <AuthHeader
      icon={
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-muted)]">
          <Mail
            size={24}
            strokeWidth={1.75}
            className="text-[var(--color-primary)]"
          />
        </div>
      }
      title="Quên mật khẩu?"
      description="Nhập email của bạn, chúng tôi sẽ gửi mã xác thực để đặt lại mật khẩu"
      size="sm"
      className="mt-20"
    />
  );
}
