import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '@/shared/components/common/AuthHeader';
import { ROUTES } from '@/shared/constants';
import { Key } from 'lucide-react';
import { toast } from 'sonner';

const maskEmail = (email?: string) => {
  if (!email) return '';

  const [name, domain] = email.split('@');
  if (!name || !domain) return email;

  if (name.length <= 2) return `${name[0]}***@${domain}`;

  return `${name.slice(0, 2)}***@${domain}`;
};

export function EmailVerifyHeader() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('auth.fp.email');

  useEffect(() => {
    if (!email) {
      toast.error('Phiên làm việc đã hết. Vui lòng nhập email lại');
      navigate(ROUTES.FORGOT_PASSWORD);
    }
  }, [email, navigate]);

  return (
    <AuthHeader
      icon={
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-muted)]">
          <Key
            size={24}
            strokeWidth={2}
            className="text-[var(--color-primary)]"
          />
        </div>
      }
      title="Nhập mã xác thực"
      description={
        <>
          Chúng tôi đã gửi mã 6 chữ số đến{' '}
          <span className="font-semibold text-red-500">
            {maskEmail(email || '')}
          </span>
        </>
      }
      size="md"
      className="mt-8"
    />
  );
}

export default EmailVerifyHeader;
