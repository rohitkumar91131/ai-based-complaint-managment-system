import { forwardRef } from 'react';
import { cn } from "../../utils/helpers";

const Input = forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500",
          error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;