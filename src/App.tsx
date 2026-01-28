import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from '@/core/configs/queryClient';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from '@/shared/stores/authContext';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
