import AppHeader from '@/shared/components/common/Header';
import ChangePasswordHeader from '../components/ChangePasswordHeader';
import ChangePasswordForm from '../components/ChangePasswordForm';

export function ChangePassword() {
  return (
    <div className="flex min-h-screen justify-center sm:p-6">
      <div className="flex min-h-screen w-full max-w-[440px] flex-col overflow-hidden bg-white sm:min-h-fit sm:rounded-[40px] md:max-w-[700px]">
        <div className="scrollbar-hide flex-1 overflow-y-auto px-6 py-12 md:px-12">
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
