import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/shared/components/common/Input';
import { Button } from '@/shared/components/common/Button';
import { authService } from '@/shared/services/authService';
import { ROUTES } from '@/shared/constants';

interface SignUpFormData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      await authService.signUp({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
      });
      toast.success('Đăng ký thành công!');
      navigate(ROUTES.SIGN_IN);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Đăng ký thất bại';
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
      <div className="mb-[24px]">
        <Input
          label="Họ và tên"
          type="text"
          placeholder="Nhập họ và tên của bạn"
          required
          error={errors.name?.message}
          inputSize="lg"
          className="h-[58.46px]"
          disabled={isLoading}
          {...register('name', {
            required: 'Vui lòng nhập họ tên',
            validate: (value) =>
              value?.trim() !== '' ||
              'Họ và tên không được chứa chỉ khoảng trắng',
          })}
        />
      </div>

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
            validate: (value) =>
              value?.trim() !== '' || 'Email không được chứa chỉ khoảng trắng',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email không hợp lệ',
            },
          })}
        />
      </div>

      <div className="mb-[24px]">
        <Input
          label="Số điện thoại"
          type="tel"
          placeholder="0123456789"
          required
          error={errors.phoneNumber?.message}
          inputSize="lg"
          className="h-[58.46px]"
          disabled={isLoading}
          {...register('phoneNumber', {
            required: 'Vui lòng nhập số điện thoại',
            validate: (value) =>
              value?.trim() !== '' ||
              'Số điện thoại không được chứa chỉ khoảng trắng',
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: 'Số điện thoại không hợp lệ',
            },
          })}
        />
      </div>

      <div className="mb-[24px]">
        <Input
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
          required
          error={errors.password?.message}
          inputSize="lg"
          className="h-[58.46px]"
          disabled={isLoading}
          icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          onIconClick={() => setShowPassword(!showPassword)}
          {...register('password', {
            required: 'Vui lòng nhập mật khẩu',
            validate: (value) =>
              value?.trim() !== '' ||
              'Mật khẩu không được chứa chỉ khoảng trắng',
            minLength: {
              value: 8,
              message: 'Mật khẩu phải có ít nhất 8 ký tự',
            },
          })}
        />
      </div>

      <div className="mb-[24px]">
        <Input
          label="Xác nhận mật khẩu"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Nhập lại mật khẩu"
          required
          error={errors.confirmPassword?.message}
          inputSize="lg"
          className="h-[58.46px]"
          disabled={isLoading}
          icon={showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          {...register('confirmPassword', {
            required: 'Vui lòng xác nhận mật khẩu',
            validate: (value) => {
              if (value?.trim() === '')
                return 'Xác nhận mật khẩu không được chứa chỉ khoảng trắng';
              return value === password || 'Mật khẩu không khớp';
            },
          })}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-[67.96px] rounded-[16px] text-[18px] font-bold"
      >
        Đăng ký
      </Button>

      <div className="mt-[30px] text-center">
        <p className="font-sans text-[16px] text-[#4A5565]">
          Đã có tài khoản?{' '}
          <Link
            to={ROUTES.SIGN_IN}
            className="font-bold text-[var(--color-primary-button)] hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignUpForm;
