import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadMessages } from '../../api/messagesApi';

// Загрузка начальных сообщений
export const fetchInitialMessages = createAsyncThunk(
  'messages/fetchInitial',
  async (_, { rejectWithValue }) => {
    try {
      return await loadMessages(0); // messageId = 0 → последние 20
    } catch {
      return rejectWithValue('Не удалось загрузить сообщения');
    }
  }
);

// Проверка новых сообщений
export const checkNewMessages = createAsyncThunk(
  'messages/checkNew',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const messages = state.messages.items;
      if (messages.length === 0) return []; // нет сообщений — нечего проверять

      const lastMessageId = messages[messages.length - 1].id;
      return await loadMessages(lastMessageId);
    } catch {
      return rejectWithValue(null); // не критично, просто пропускаем
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Начальная загрузка
      .addCase(fetchInitialMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.Messages;
      })
      .addCase(fetchInitialMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

			.addCase(checkNewMessages.fulfilled, (state, action) => {
        if (action.payload?.length !== 0) {
          state.items.push(...action.payload.Messages);
        }
      });
  },
});

export default messagesSlice.reducer;
