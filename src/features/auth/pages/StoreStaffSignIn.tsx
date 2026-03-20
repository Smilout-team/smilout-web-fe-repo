import { StoreStaffSignInHeader } from '../components/StoreStaffSignInHeader';
import { StoreStaffSignInForm } from '../components/StoreStaffSignInForm';

export function StoreStaffSignIn() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: 'url(/background_store-staff_sign-in.png)',
      }}
    >
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-[420px] rounded-[24px] bg-white p-8 shadow-lg">
          <StoreStaffSignInHeader />

          <div className="h-[32px]" />

          <StoreStaffSignInForm />
        </div>
      </div>
    </div>
  );
}

export default StoreStaffSignIn;
