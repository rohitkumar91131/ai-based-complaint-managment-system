import { useDispatch, useSelector } from 'react-redux';
import { chatWithCopilot } from '../services/copilotService';
import { addMessage, setLoading, setError, setAiAnalysis } from '../store/slices/chatSlice';
import { updateComplaintData } from '../store/slices/complaintSlice';
import { toast } from 'sonner';

export const useCopilot = () => {
  const dispatch = useDispatch();
  const currentComplaint = useSelector((state) => state.complaint.data);
  const { messages, isLoading, summary, risk } = useSelector((state) => state.chat);

  const sendMessage = async (text, file = null) => {
    if (!text && !file) return;

    dispatch(addMessage({ role: 'user', content: text, file: file?.name }));
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await chatWithCopilot(text, currentComplaint, file);
      
      if (response.complaint) {
        dispatch(updateComplaintData(response.complaint));
      }
      if (response.ai_copilot) {
        dispatch(setAiAnalysis(response.ai_copilot));
        dispatch(addMessage({ 
          role: 'assistant', 
          content: 'I have updated the form based on your input. Check the summary and risk assessment above.'
        }));
      }
    } catch (err) {
      dispatch(setError('Failed to process request.'));
      dispatch(addMessage({ role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', isError: true }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { sendMessage, messages, isLoading, summary, risk };
};