export function SignInHeader() {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/public/Logo.svg"
        alt="SMILOUT Logo"
        className="mb-[32px] h-auto w-[192px] object-contain"
      />
      <h1 className="text-center font-sans text-[24px] text-[#0A0A0A]">
        Chào mừng trở lại!
      </h1>
      <p className="mt-2 text-center font-sans text-[16px] text-[#4A5565]">
        Đăng nhập để tiếp tục mua sắm
      </p>
    </div>
  );
}
export default SignInHeader;
