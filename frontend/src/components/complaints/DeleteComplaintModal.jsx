import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Button from '../common/Button';

export default function DeleteComplaintModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100"
        >
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Delete Complaint?</h3>
            <p className="text-slate-500 text-sm">
              This action cannot be undone. This will permanently delete the complaint record from the database.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" className="bg-red-500 hover:bg-red-600" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}