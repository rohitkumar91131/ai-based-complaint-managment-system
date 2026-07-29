export default function Tooltip({ children, content, disabled = false }) {
  if (disabled) return children;
  
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max">
        <div className="bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-md shadow-lg">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
        </div>
      </div>
    </div>
  );
}