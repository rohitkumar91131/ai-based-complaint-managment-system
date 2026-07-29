import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import StatusBadge from './StatusBadge';
import RiskBadge from './RiskBadge';
import SummaryCard from '../copilot/SummaryCard';
import RiskCard from '../copilot/RiskCard';

const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-3 py-3 border-b border-slate-50 last:border-0">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className="text-sm text-slate-800 col-span-2 font-medium">{value || '-'}</span>
  </div>
);

export default function ComplaintModal({ complaint, isOpen, onClose }) {
  if (!isOpen || !complaint) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-slate-100 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-slate-800">Complaint {complaint.id || '#---'}</h2>
              <StatusBadge status={complaint.status} />
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Customer & Source</h3>
                <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                  <DetailRow label="Customer Name" value={complaint.customer_name} />
                  <DetailRow label="Complaint Source" value={complaint.complaint_source} />
                </div>
              </section>
              <section>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Product Details</h3>
                <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                  <DetailRow label="Product Name" value={complaint.product_name} />
                  <DetailRow label="Batch / Lot" value={complaint.batch_lot_number} />
                  <DetailRow label="Mfg Date" value={complaint.manufacturing_date} />
                </div>
              </section>
            </div>

            <section>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Complaint Information</h3>
              <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                <div>
                  <DetailRow label="Type" value={complaint.complaint_type} />
                  <DetailRow label="Date" value={complaint.complaint_date} />
                </div>
                <div>
                  <div className="grid grid-cols-3 py-3 border-b border-slate-50">
                    <span className="text-sm font-medium text-slate-500">Risk</span>
                    <div className="col-span-2"><RiskBadge risk={complaint.risk_level || complaint.risk} /></div>
                  </div>
                  <DetailRow label="Severity" value={complaint.initial_severity} />
                </div>
                <div className="col-span-1 lg:col-span-2 mt-4 pt-4 border-t border-slate-100">
                  <span className="text-sm font-medium text-slate-500 block mb-2">Description</span>
                  <p className="text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-slate-100">
                    {complaint.complaint_description || 'No description provided.'}
                  </p>
                </div>
              </div>
            </section>

            {(complaint.ai_summary || complaint.ai_risk) && (
              <section>
                 <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    AI Analysis
                  </h3>
                 <SummaryCard summary={complaint.ai_summary} />
                 <RiskCard risk={complaint.ai_risk} />
              </section>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}