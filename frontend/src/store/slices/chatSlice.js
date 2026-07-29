import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
    summary: '',
    risk: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAiAnalysis: (state, action) => {
      state.summary = action.payload.summary;
      state.risk = action.payload.risk;
    },
    clearChat: (state) => {
      state.messages = [];
      state.summary = '';
      state.risk = null;
      state.error = null;
    }
  }
});

export const { addMessage, setLoading, setError, setAiAnalysis, clearChat } = chatSlice.actions;
export default chatSlice.reducer;