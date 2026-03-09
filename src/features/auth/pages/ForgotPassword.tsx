import { ForgotPasswordHeader } from '../components/ForgotPasswordHeader';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center sm:p-6">
      <div className="flex min-h-screen w-full max-w-[440px] flex-col overflow-hidden bg-white sm:min-h-fit sm:rounded-[40px] md:max-w-[700px]">
        <div className="scrollbar-hide flex-1 overflow-y-auto px-6 py-12 md:px-12">
          <ForgotPasswordHeader />

          <div className="h-[32px]" />

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
