import { forwardRef } from 'react';
import { cn } from "../../utils/helpers";

const TextAreaField = forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <textarea
        ref={ref}
        className={cn(
          "w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 min-h-[100px] resize-y",
          className
        )}
        {...props}
      />
    </div>
  );
});
TextAreaField.displayName = 'TextAreaField';
export default TextAreaField;