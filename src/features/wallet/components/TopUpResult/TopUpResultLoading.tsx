export const TopUpResultLoading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Đang xác nhận thanh toán...
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Vui lòng chờ trong giây lát
        </p>
      </div>
    </div>
  );
};
