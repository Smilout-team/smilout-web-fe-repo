import AppHeader from '@/shared/components/common/Header';
import EmailVerifyHeader from '../components/EmailVerifyHeader';
import EmailVerifyForm from '../components/EmailVerifyForm';

export function EmailVerification() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex min-h-screen w-full flex-col overflow-hidden bg-white sm:min-h-fit sm:rounded-[40px]">
        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <AppHeader title="Xác thực OTP" />

          <EmailVerifyHeader />

          <div className="h-[32px]" />

          <EmailVerifyForm />
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
