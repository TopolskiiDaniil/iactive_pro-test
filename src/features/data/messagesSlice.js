import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadMessages } from "../../api/messagesApi";
import { COLUMN_NAMES, FILTERS, SORT_ORDERS } from "../../const/common";

const savedFilter =localStorage.getItem("filter");
const savedSort = localStorage.getItem("sortOrder");

export const fetchInitialMessages = createAsyncThunk(
  "messages/fetchInitial",
  async (_, { rejectWithValue }) => {
    try {
      return await loadMessages(0);
    } catch {
      return rejectWithValue("Не удалось загрузить сообщения");
    }
  }
);

export const checkNewMessages = createAsyncThunk(
  "messages/checkNew",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const messages = state.messages.items;
      if (messages.length === 0) return [];

      const lastMessageId = messages[messages.length - 1].id;
      return await loadMessages(lastMessageId);
    } catch {
      return rejectWithValue(null);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    items: [],
    loading: false,
    error: null,
		currentFilter: savedFilter || FILTERS.ALL,
		currentSort: savedSort || SORT_ORDERS.OLDEST,
  },
  reducers: {
    setItemsFromStorage: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },

    toggleFavorite: (state, action) => {
      const id = action.payload;
      const msg = state.items.find((m) => m.id === id);
      if (msg) msg.isFavorite = !msg.isFavorite;
      localStorage.setItem("messages", JSON.stringify(state.items));
    },

		changeCurrentFilter: (state, action) => {
			state.currentFilter = action.payload;
			localStorage.setItem("filter", state.currentFilter);
		},

    updateColumn: (state, action) => {
      const { id, column } = action.payload;
      const msg = state.items.find((m) => m.id === id);
      if (msg) {
				msg.column = column
			};
      localStorage.setItem("messages", JSON.stringify(state.items));
    },

		changeCurrentSort: (state, action) => {
			state.currentSort = action.payload;
			localStorage.setItem("sortOrder", state.currentSort);
		},

		deleteMessage: (state, action) => {
			const id = action.payload;
			state.items = state.items.filter((m) => m.id !== id);
			localStorage.setItem("messages", JSON.stringify(state.items));
		},
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.Messages.map((msg) => ({
          ...msg,
          isFavorite: false,
					isMinimized: false,
					isOld: true,
          column: COLUMN_NAMES.CENTER,
        }));

        localStorage.setItem("messages", JSON.stringify(state.items));
				localStorage.setItem("filter", state.currentFilter);
				localStorage.setItem("sortOrder", state.currentSort);
      })
      .addCase(fetchInitialMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkNewMessages.fulfilled, (state, action) => {

  			const rawMessages = action.payload?.Messages || [];
  			if (rawMessages.length === 0) return;

  			const existingIds = new Set(state.items.map((m) => m.id));

  			const uniqueNewOnes = rawMessages.filter((msg) => !existingIds.has(msg.id)).map((msg) => ({
      		...msg,
      		isFavorite: false,
      		column: COLUMN_NAMES.CENTER,
  			}));

  			if (uniqueNewOnes.length === 0) {
    			return;
  			}

  			state.items.push(...uniqueNewOnes);

  			localStorage.setItem("messages", JSON.stringify(state.items));
      });
  },
});

export const { setItemsFromStorage, toggleFavorite, updateColumn, changeCurrentFilter, changeCurrentSort, deleteMessage } =
  messagesSlice.actions;

export default messagesSlice.reducer;
