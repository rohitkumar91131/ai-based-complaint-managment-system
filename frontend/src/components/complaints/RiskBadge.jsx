import { cn } from '../../utils/helpers';

export default function RiskBadge({ risk }) {
  const styles = {
    critical: "bg-red-100 text-red-800 border-red-200",
    major: "bg-orange-100 text-orange-800 border-orange-200",
    minor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-emerald-100 text-emerald-800 border-emerald-200"
  };

  const normalized = risk?.toLowerCase() || 'low';

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border capitalize", styles[normalized] || styles.low)}>
      {risk || 'Low'}
    </span>
  );
}