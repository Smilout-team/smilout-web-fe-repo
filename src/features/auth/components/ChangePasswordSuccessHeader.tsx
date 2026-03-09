import { AuthHeader } from '@/shared/components/common/AuthHeader';
import { Check } from 'lucide-react';

export function ChangePasswordSuccessHeader() {
  return (
    <AuthHeader
      icon={
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check size={34} strokeWidth={2} className="text-green-900" />
        </div>
      }
      title="Thành công!"
      description="Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng nhập với mật khẩu mới ngay bây giờ."
      size="sm"
      className="mt-20"
    />
  );
}
