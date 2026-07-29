import { cn } from '../../utils/helpers';

export default function StatusBadge({ status }) {
  const styles = {
    open: "bg-amber-100 text-amber-800 border-amber-200",
    resolved: "bg-emerald-100 text-emerald-800 border-emerald-200",
    closed: "bg-slate-100 text-slate-800 border-slate-200",
    investigation: "bg-blue-100 text-blue-800 border-blue-200"
  };

  const normalized = status?.toLowerCase() || 'open';
  
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border capitalize", styles[normalized] || styles.open)}>
      {status || 'Open'}
    </span>
  );
}