import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/shared/components/common/Input';
import { Button } from '@/shared/components/common/Button';
import { useAuth } from '@/shared/hooks/useAuth';

interface SignInFormData {
  email: string;
  password: string;
}

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      await signIn(data);
      toast.success('Đăng nhập thành công!');
      navigate('/home');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Đăng nhập thất bại';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* Email Field */}
      <div className="mb-[24px]">
        <Input
          label="Email"
          type="email"
          placeholder="email@example.com"
          required
          error={errors.email?.message}
          inputSize="lg"
          className="h-[58.46px]"
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
      <div className="mb-[20px]">
        <Input
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          placeholder="Nhập mật khẩu"
          required
          error={errors.password?.message}
          inputSize="lg"
          className="h-[58.46px]"
          disabled={isLoading}
          icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          onIconClick={() => setShowPassword(!showPassword)}
          {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
        />
      </div>

      {/* Quên mật khẩu */}
      <div className="mb-[20px]">
        <a
          href="#"
          className="font-sans text-[14px] text-[#FF6B6B] hover:underline"
        >
          Quên mật khẩu?
        </a>
      </div>

      {/* Nút Đăng nhập */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-[67.96px] rounded-[16px] text-[18px] font-bold"
      >
        Đăng nhập
      </Button>

      {/* Divider */}
      <div className="mt-[24px] mb-[24px] flex items-center gap-x-[12px]">
        <div className="h-[1px] flex-1 bg-[#E5E7EB]" />
        <span className="font-sans text-[14px] text-[#6A7282]">hoặc</span>
        <div className="h-[1px] flex-1 bg-[#E5E7EB]" />
      </div>

      {/* Nút Tiếp tục với Google */}
      <Button
        type="button"
        variant="secondary"
        size="lg"
        fullWidth
        disabled={isLoading}
        className="mb-[30px] h-[58.46px]"
      >
        Tiếp tục với Google
      </Button>

      {/* Link Đăng ký */}
      <div className="text-center">
        <p className="font-sans text-[16px] text-[#4A5565]">
          Chưa có tài khoản?{' '}
          <a href="#" className="font-bold text-[#FF6B6B] hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </form>
  );
}

export default SignInForm;
