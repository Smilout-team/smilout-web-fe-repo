import AppHeader from '@/shared/components/common/Header';
import ChangePasswordHeader from '../components/ChangePasswordHeader';
import ChangePasswordForm from '../components/ChangePasswordForm';

export function ChangePassword() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex min-h-screen w-full flex-col overflow-hidden bg-white sm:min-h-fit sm:rounded-[40px]">
        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <AppHeader title="Mật khẩu mới" />

          <ChangePasswordHeader />

          <div className="h-[32px]" />

          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
