import { useAuth } from '@/shared/hooks/useAuth';
import { Button } from '@/shared/components/common/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/sign-in');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900">
          Chào mừng, {user?.name || user?.email}!
        </h1>
        <p className="mt-2 text-gray-600">Đây là trang chủ</p>

        <div className="mt-6 space-y-2 text-gray-700">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <Button onClick={handleLogout} variant="danger" className="mt-8">
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
