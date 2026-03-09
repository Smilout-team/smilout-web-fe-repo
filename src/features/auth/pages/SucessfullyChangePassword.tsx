import { ChangePasswordSuccessHeader } from '../components/ChangePasswordSuccessHeader';

export function SuccessfullyChangePassword() {
  return (
    // <div className="flex flex-col items-center justify-center">
    //   <ForgotPasswordHeader />
    //   <ForgotPasswordForm />
    // </div>
    <div className="flex min-h-screen items-center justify-center sm:p-6">
      <div className="flex min-h-screen w-full max-w-[440px] flex-col overflow-hidden bg-white sm:min-h-fit sm:rounded-[40px] md:max-w-[700px]">
        <div className="scrollbar-hide flex flex-1 items-center justify-center overflow-y-auto px-6 py-12 md:px-12">
          <ChangePasswordSuccessHeader />
        </div>
      </div>
    </div>
  );
}

export default SuccessfullyChangePassword;
