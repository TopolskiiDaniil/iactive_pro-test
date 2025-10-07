import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../features/data/messagesSlice';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
  },
});
