import { NavLink } from 'react-router';
import { LayoutDashboard, Inbox } from 'lucide-react';
import { cn } from '../../utils/helpers';

export default function Sidebar() {
  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'AI Copilot', end: true },
    { to: '/dashboard/complaints', icon: Inbox, label: 'Complaints', end: false },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-slate-200 h-full flex flex-col p-4">
      <div className="flex-1 space-y-1">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
          Menu
        </div>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive 
                  ? "bg-accent-50 text-accent-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}