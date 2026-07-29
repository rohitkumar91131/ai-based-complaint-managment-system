import { useSelector } from 'react-redux';
import { Activity, WifiOff, RefreshCw } from 'lucide-react';
import Tooltip from '../common/Tooltip';
import { formatTime } from '../../utils/helpers';

export default function ConnectionBadge() {
  const { status, latency, lastChecked } = useSelector(state => state.connection);

  const getBadgeStyle = () => {
    if (status === 'checking') return 'bg-amber-50 text-amber-600 border-amber-200';
    if (status === 'connected') return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    return 'bg-red-50 text-red-600 border-red-200';
  };

  const timeString = lastChecked ? formatTime(new Date(lastChecked)) : '';

  return (
    <Tooltip content={`Last checked: ${timeString}`}>
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${getBadgeStyle()}`}>
        {status === 'checking' && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
        {status === 'connected' && <Activity className="w-3.5 h-3.5" />}
        {status === 'disconnected' && <WifiOff className="w-3.5 h-3.5" />}
        
        <span>
          {status === 'checking' && 'Checking...'}
          {status === 'connected' && `Backend Connected ${latency ? `(${latency} ms)` : ''}`}
          {status === 'disconnected' && 'Backend Offline'}
        </span>
      </div>
    </Tooltip>
  );
}