import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    status: 'checking', // 'checking' | 'connected' | 'disconnected'
    latency: null,
    lastChecked: null,
  },
  reducers: {
    setConnectionState: (state, action) => {
      state.status = action.payload.status;
      state.latency = action.payload.latency || null;
      state.lastChecked = new Date().toISOString();
    }
  }
});

export const { setConnectionState } = connectionSlice.actions;
export default connectionSlice.reducer;