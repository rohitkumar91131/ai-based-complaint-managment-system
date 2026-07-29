import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';
import Button from '../components/common/Button';
import ComplaintStats from '../components/complaints/ComplaintStats';
import ComplaintTable from '../components/complaints/ComplaintTable';
import { useComplaintsList } from '../hooks/useComplaintsList';
import Loader from '../components/common/Loader';

export default function ComplaintsPage() {
  const navigate = useNavigate();
  const { items, isLoading, error, handleDelete } = useComplaintsList();

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Complaints</h1>
          <p className="text-sm text-slate-500 mt-1">Manage all customer complaints.</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          <Plus className="w-4 h-4" />
          New Complaint
        </Button>
      </div>

      <ComplaintStats items={items || []} />

      {/* Note: In a production app, ComplaintFilters would be inserted here to drive the `updateFilters` hook call */}

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <Loader className="w-8 h-8" />
            <p>Loading complaints...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-red-100 shadow-sm text-red-500 p-6 text-center">
          <p className="mb-4">Failed to load data from the backend.</p>
          <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : (
        <ComplaintTable data={items || []} onDelete={handleDelete} />
      )}
    </div>
  );
}