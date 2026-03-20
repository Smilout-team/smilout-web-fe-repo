import { ForgotPasswordHeader } from '../components/ForgotPasswordHeader';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex min-h-screen w-full flex-col overflow-hidden bg-white sm:min-h-fit sm:rounded-[40px]">
        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <ForgotPasswordHeader />

          <div className="h-[32px]" />

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
