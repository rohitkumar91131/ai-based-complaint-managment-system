import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useBackendHealth } from '../../hooks/useBackendHealth';

export default function MainLayout() {
  // Mount the health check at the root layout so it constantly polls
  useBackendHealth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-hidden">
      <Navbar />
      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 w-full overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}