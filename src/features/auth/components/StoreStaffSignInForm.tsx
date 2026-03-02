import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/shared/components/common/Input';
import { Button } from '@/shared/components/common/Button';
import { useAuth } from '@/shared/hooks/useAuth';
import { ROUTES } from '@/shared/constants';

interface StoreStaffSignInFormData {
  email: string;
  password: string;
}

export function StoreStaffSignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreStaffSignInFormData>();

  const onSubmit = async (data: StoreStaffSignInFormData) => {
    try {
      setIsLoading(true);
      await signIn(data);
      toast.success('Đăng nhập thành công!');
      navigate(ROUTES.STORE_STAFF_DASHBOARD);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Đăng nhập thất bại';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
      noValidate
    >
      {/* Email Field */}
      <div className="mb-[16px]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Mail size={14} className="text-[#6B7280]" />
          <label className="font-sans text-[14px] text-[#374151]">
            Địa chỉ email
          </label>
        </div>
        <Input
          type="email"
          placeholder="Nhập email"
          error={errors.email?.message}
          inputSize="md"
          disabled={isLoading}
          {...register('email', {
            required: 'Vui lòng nhập email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email không hợp lệ',
            },
          })}
        />
      </div>

      {/* Password Field */}
      <div className="mb-[24px]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Lock size={14} className="text-[#6B7280]" />
          <label className="font-sans text-[14px] text-[#374151]">
            Mật khẩu
          </label>
        </div>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Nhập mật khẩu"
          error={errors.password?.message}
          inputSize="md"
          disabled={isLoading}
          icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          onIconClick={() => setShowPassword(!showPassword)}
          {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
        />
      </div>

      {/* Nút Đăng nhập */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-[48px] text-[16px] font-medium"
      >
        Đăng nhập
      </Button>
    </form>
  );
}

export default StoreStaffSignInForm;
