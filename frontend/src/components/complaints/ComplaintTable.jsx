import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import RiskBadge from './RiskBadge';
import Tooltip from '../common/Tooltip';
import ComplaintModal from './ComplaintModal';
import DeleteComplaintModal from './DeleteComplaintModal';
import Card from '../common/Card';

export default function ComplaintTable({ data, onDelete }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlComplaintId = searchParams.get('complaintId');
  
  const [viewModalData, setViewModalData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Automatically open the modal if a complaintId is in the URL
  useEffect(() => {
    if (urlComplaintId && data.length > 0) {
      const found = data.find(row => String(row.id) === String(urlComplaintId));
      if (found) {
        setViewModalData(found);
      }
    }
  }, [urlComplaintId, data]);

  // When closing the modal, clean up the URL
  const handleCloseModal = () => {
    setViewModalData(null);
    if (urlComplaintId) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('complaintId');
      setSearchParams(newParams, { replace: true });
    }
  };

  // Clicking the Eye button now updates the URL instead of opening the modal directly
  const handleViewClick = (row) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('complaintId', row.id);
    setSearchParams(newParams);
  };

  return (
    <Card className="p-0 overflow-hidden flex-1 flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-xs sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 font-semibold">ID</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Batch</th>
              <th className="px-6 py-4 font-semibold">Risk</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr><td colSpan="8" className="px-6 py-8 text-center text-slate-500">No complaints found.</td></tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">{row.id || '#--'}</td>
                  <td className="px-6 py-4 text-slate-600">{row.customer_name || '-'}</td>
                  <td className="px-6 py-4 text-slate-600">{row.product_name || '-'}</td>
                  <td className="px-6 py-4 text-slate-600">{row.batch_lot_number || '-'}</td>
                  <td className="px-6 py-4"><RiskBadge risk={row.risk || row.ai_risk_level || row.risk_level} /></td>
                  <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                  <td className="px-6 py-4 text-slate-500">{row.complaint_date || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip content="View">
                        <button onClick={() => handleViewClick(row)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Delete">
                        <button onClick={() => setDeleteId(row.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <ComplaintModal isOpen={!!viewModalData} complaint={viewModalData} onClose={handleCloseModal} />
      <DeleteComplaintModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { onDelete(deleteId); setDeleteId(null); }} 
      />
    </Card>
  );
}