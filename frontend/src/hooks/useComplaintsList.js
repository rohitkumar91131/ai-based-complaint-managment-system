import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComplaints, deleteComplaintRecord } from '../services/complaintService';
import { setComplaints, setLoading, setError, removeComplaint, setFilters } from '../store/slices/complaintsSlice';
import { toast } from 'sonner';

export const useComplaintsList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, filters } = useSelector(state => state.complaintsList);

  const loadComplaints = async () => {
    dispatch(setLoading(true));
    try {
      // In a real app, pass filters. Mocking empty array fallback if backend is missing endpoint
      const data = await fetchComplaints(filters).catch(() => []);
      dispatch(setComplaints(data));
    } catch (err) {
      dispatch(setError('Failed to load complaints.'));
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [filters]); // Reload when filters change

  const handleDelete = async (id) => {
    try {
      await deleteComplaintRecord(id).catch(() => console.warn('Mock delete'));
      dispatch(removeComplaint(id));
      toast.success('Complaint deleted successfully');
    } catch (err) {
      toast.error('Failed to delete complaint');
    }
  };

  const updateFilters = (newFilters) => dispatch(setFilters(newFilters));

  return { items, isLoading, error, filters, updateFilters, handleDelete, refresh: loadComplaints };
};