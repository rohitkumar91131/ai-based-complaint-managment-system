import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import complaintReducer from './slices/complaintSlice';
import chatReducer from './slices/chatSlice';
import uiReducer from './slices/uiSlice';
import connectionReducer from './slices/connectionSlice';
import complaintsListReducer from './slices/complaintsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    complaint: complaintReducer,
    chat: chatReducer,
    ui: uiReducer,
    connection: connectionReducer,
    complaintsList: complaintsListReducer,
  },
});