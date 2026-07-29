import { createSlice } from '@reduxjs/toolkit';

const complaintsSlice = createSlice({
  name: 'complaintsList',
  initialState: {
    items: [],
    isLoading: true,
    error: null,
    filters: { search: '', status: '', risk: '', priority: '', type: '' }
  },
  reducers: {
    setComplaints: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    removeComplaint: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    }
  }
});

export const { setComplaints, setLoading, setError, setFilters, removeComplaint } = complaintsSlice.actions;
export default complaintsSlice.reducer;