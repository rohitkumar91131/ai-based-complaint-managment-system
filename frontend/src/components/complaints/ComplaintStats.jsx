import { FileText, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import Card from '../common/Card';

export default function ComplaintStats({ items }) {
  const stats = [
    { title: 'Total Complaints', count: items.length, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Open', count: items.filter(i => i.status?.toLowerCase() === 'open').length, icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Major Risk', count: items.filter(i => ['critical', 'major'].includes(i.risk?.toLowerCase())).length, icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Resolved', count: items.filter(i => i.status?.toLowerCase() === 'resolved').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <Card key={idx} className="p-5 hover:shadow-md transition-shadow group cursor-default">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.count}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}