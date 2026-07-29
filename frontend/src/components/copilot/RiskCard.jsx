import { AlertTriangle, ShieldAlert, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

export default function RiskCard({ risk }) {
  if (!risk) return null;

  const levelStyles = {
    high: "bg-red-50 border-red-200 text-red-900",
    medium: "bg-amber-50 border-amber-200 text-amber-900",
    low: "bg-emerald-50 border-emerald-200 text-emerald-900"
  };

  const Icon = risk.level?.toLowerCase() === 'high' ? ShieldAlert 
             : risk.level?.toLowerCase() === 'medium' ? AlertTriangle 
             : AlertCircle;

  return (
    <div className={cn("border rounded-xl p-4 mb-4", levelStyles[risk.level?.toLowerCase()] || levelStyles.low)}>
      <div className="flex items-center gap-2 font-semibold mb-2 capitalize">
        <Icon className="w-4 h-4" />
        {risk.level} Risk Level
      </div>
      <p className="text-sm mb-2 opacity-90"><span className="font-medium">Reason:</span> {risk.reason}</p>
      <div className="text-xs bg-white/60 p-2 rounded-lg font-medium">
        Action: {risk.recommended_action}
      </div>
    </div>
  );
}