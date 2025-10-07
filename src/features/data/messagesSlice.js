import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadMessages } from '../../api/messagesApi';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await loadMessages();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Неизвестная ошибка');
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.items= action.payload.Messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messagesSlice.reducer;
