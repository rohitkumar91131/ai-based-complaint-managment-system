import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { updateComplaintData, resetComplaint, saveComplaintThunk } from '../store/slices/complaintSlice';
import { clearChat } from '../store/slices/chatSlice';
import { toast } from 'sonner';

export const useComplaint = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const complaintData = useSelector((state) => state.complaint.data);
  const saveStatus = useSelector((state) => state.complaint.saveStatus);
  const { summary, risk } = useSelector((state) => state.chat);
  const isOffline = useSelector(state => state.connection.status === 'disconnected');

  const handleSave = async () => {
    if (isOffline) {
      toast.error('Cannot save: Backend is offline.');
      return;
    }

    const payload = {
      ...complaintData,
      ai_summary: summary || '',
      ai_risk_level: risk?.level || '',
      ai_reason: risk?.reason || '',
      ai_recommended_action: risk?.recommended_action || ''
    };

    try {
      const savedComplaint = await dispatch(saveComplaintThunk(payload)).unwrap();
      
      // Grab the ID from the backend response (adjust if your backend uses a different key like '_id')
      const newId = savedComplaint?.id || '';
      
      toast.success('Complaint saved successfully!', {
        duration: 5000,
        action: {
          label: 'View',
          onClick: () => navigate(`/dashboard/complaints?complaintId=${newId}`)
        }
      });
      
      // Reset form but do NOT navigate away
      dispatch(resetComplaint());
      dispatch(clearChat());
      
    } catch (error) {
      toast.error(error || 'Failed to save complaint. Check your network.');
    }
  };

  const handleReset = () => {
    dispatch(resetComplaint());
    dispatch(clearChat());
    toast.info('Form and chat reset.');
  };

  return { complaintData, handleSave, handleReset, saveStatus };
};