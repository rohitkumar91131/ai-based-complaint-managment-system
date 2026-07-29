import { cn } from "../../utils/helpers";

export default function Button({ children, variant = 'primary', className, ...props }) {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-accent-600 text-white hover:bg-accent-700 shadow-sm",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border border-slate-200 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100"
  };

  return (
    <button className={cn(baseStyle, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}