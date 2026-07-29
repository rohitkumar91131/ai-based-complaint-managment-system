import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { INITIAL_COMPLAINT_STATE } from '../../utils/constants';
import { createComplaint } from '../../services/complaintService';

// NEW: Async Thunk to handle backend API call
export const saveComplaintThunk = createAsyncThunk(
  'complaint/save',
  async (complaintData, { rejectWithValue }) => {
    try {
      const response = await createComplaint(complaintData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to save complaint due to a server error.'
      );
    }
  }
);

const complaintSlice = createSlice({
  name: 'complaint',
  initialState: {
    data: INITIAL_COMPLAINT_STATE,
    isDirty: false,
    saveStatus: 'idle', // 'idle' | 'loading' | 'success' | 'error'
    saveError: null,
  },
  reducers: {
    updateComplaintData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      state.isDirty = true;
    },
    resetComplaint: (state) => {
      state.data = INITIAL_COMPLAINT_STATE;
      state.isDirty = false;
      state.saveStatus = 'idle';
      state.saveError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveComplaintThunk.pending, (state) => {
        state.saveStatus = 'loading';
        state.saveError = null;
      })
      .addCase(saveComplaintThunk.fulfilled, (state) => {
        state.saveStatus = 'success';
        state.saveError = null;
      })
      .addCase(saveComplaintThunk.rejected, (state, action) => {
        state.saveStatus = 'error';
        state.saveError = action.payload;
      });
  }
});

export const { updateComplaintData, resetComplaint } = complaintSlice.actions;
export default complaintSlice.reducer;