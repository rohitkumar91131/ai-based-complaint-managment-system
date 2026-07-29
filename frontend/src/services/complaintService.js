import apiClient from '../api/axios';

// NEW: Real POST request to create a complaint
export const createComplaint = async (complaintData) => {
  const response = await apiClient.post('/api/complaints', complaintData);
  return response.data;
};

// Existing methods
export const fetchComplaints = async (filters = {}) => {
  const response = await apiClient.get('/api/complaints', { params: filters });
  return response.data;
};

export const deleteComplaintRecord = async (id) => {
  const response = await apiClient.delete(`/api/complaints/${id}`);
  return response.data;
};