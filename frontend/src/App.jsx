import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'sonner';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ComplaintsPage from './pages/ComplaintsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/complaints" element={<ComplaintsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}