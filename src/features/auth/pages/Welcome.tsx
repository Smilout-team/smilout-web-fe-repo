import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';

const features = [
  {
    title: 'Quét & Mua',
    description: 'Quét mã sản phẩm để mua hàng ngay',
  },
  {
    title: 'Giao hàng nhanh',
    description: 'Đặt online, giao tận nơi hoặc đến lấy',
  },
  {
    title: 'Giá tốt nhất',
    description: 'Tự động tìm cửa hàng có giá tốt nhất',
  },
];

export function Welcome() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#FF6B6B] to-[#FF5252]">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-16 pb-8">
        <h1 className="text-center text-[32px] font-bold text-white">
          Mua sắm thông minh
        </h1>
        <p className="mt-3 text-center text-[16px] text-white/90">
          Tự phục vụ - Nhanh chóng - Tiện lợi
        </p>

        <div className="mt-10 w-full max-w-[340px] space-y-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[16px] bg-white/20 px-5 py-4 backdrop-blur-sm"
            >
              <h3 className="text-[16px] font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-1 text-[14px] text-white/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8">
        <div className="mx-auto w-full max-w-[340px] space-y-4">
          <Link
            to={ROUTES.SIGN_UP}
            className="flex h-[56px] w-full items-center justify-center rounded-full bg-white text-[16px] font-semibold text-[#FF5252] transition hover:bg-white/90"
          >
            Đăng ký ngay
          </Link>

          <Link
            to={ROUTES.SIGN_IN}
            className="flex h-[56px] w-full items-center justify-center rounded-full border-2 border-white bg-transparent text-[16px] font-semibold text-white transition hover:bg-white/10"
          >
            Đã có tài khoản? Đăng nhập
          </Link>
        </div>

        <p className="mt-6 text-center text-[12px] text-white/60">
          Phiên bản 1.0.0
        </p>
      </div>
    </div>
  );
}

export default Welcome;
