import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { ChangePasswordSuccessHeader } from '../components/ChangePasswordSuccessHeader';

export function SuccessfullyChangePassword() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.SIGN_IN);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center sm:p-6">
      <div className="flex min-h-screen w-full max-w-[440px] flex-col overflow-hidden bg-white sm:min-h-fit sm:rounded-[40px] md:max-w-[700px]">
        <div className="scrollbar-hide flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-12 md:px-12">
          <ChangePasswordSuccessHeader />

          <div className="h-6" />

          <p className="text-center text-sm text-[#4A5565]">
            Bạn sẽ được chuyển về trang đăng nhập sau vài giây...
          </p>
        </div>
      </div>
    </div>
  );
}

export default SuccessfullyChangePassword;
