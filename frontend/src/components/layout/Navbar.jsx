import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/helpers';
import ConnectionBadge from './ConnectionBadge';

export default function Navbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="h-16 bg-surface border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center text-white font-bold">
          AI
        </div>
        <h1 className="font-semibold text-lg text-slate-800 tracking-tight">
          Complaint Management
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span className="font-medium">{formatTime(time)}</span>
        </div>
        <ConnectionBadge />
      </div>
    </nav>
  );
}