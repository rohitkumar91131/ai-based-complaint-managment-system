import { cn } from "../../utils/helpers";

export default function Card({ children, className }) {
  return (
    <div className={cn("bg-surface rounded-2xl shadow-sm border border-slate-100 p-6", className)}>
      {children}
    </div>
  );
}