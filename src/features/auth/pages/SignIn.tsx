import { SignInHeader } from '../components/SignInHeader';
import { SignInForm } from '../components/SignInForm';

export function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center sm:p-6">
      <div className="flex min-h-screen w-full max-w-[393px] flex-col overflow-hidden bg-white sm:min-h-fit sm:rounded-[40px] md:max-w-[700px]">
        <div className="scrollbar-hide flex-1 overflow-y-auto px-6 py-12 md:px-12">
          <SignInHeader />

          <div className="h-[32px]" />

          <SignInForm />
        </div>
      </div>
    </div>
  );
}

export default SignIn;

