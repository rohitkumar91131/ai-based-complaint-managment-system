import apiClient from '../api/axios';

export const chatWithCopilot = async (userMessage, currentComplaint, file) => {
  const formData = new FormData();
  formData.append('user_message', userMessage);
  formData.append('current_complaint', JSON.stringify(currentComplaint));
  if (file) {
    formData.append('file', file);
  }

  const response = await apiClient.post('/api/copilot/chat', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};