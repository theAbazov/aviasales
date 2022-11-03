/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const getTickets = createAsyncThunk(
  'ticketSlice/getTickets',
  async (id, { rejectWithValue }) => {
    try {
      const req = await fetch(
        `https://front-test.dev.aviasales.ru/tickets?searchId=${id}`
      );

      if (req.status === 500) throw new Error('Fake error');

      const res = await req.json();

      if (!res.stop) throw new Error('Fake error');

      return res.tickets;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSearchId = createAsyncThunk(
  'ticketSlice/getSearchId',
  async () => {
    const res = await axios.get('https://front-test.dev.aviasales.ru/search');
    return res.data.searchId;
  }
);

const ticketSlice = createSlice({
  name: 'ticketSlice',
  initialState: {
    tickets: [],
    searchId: '',
    checkedFilters: ['2'],
    sort: 'cheap',
    isLoading: false,
    renderTickets: 5,
    errorMessage: '',
  },
  reducers: {
    errorNull: (state) => {
      state.errorMessage = '';
    },
    showMore: (state) => {
      state.renderTickets += 5;
    },
    toggleItem: (state, action) => {
      if (state.checkedFilters.includes(action.payload)) {
        state.checkedFilters = state.checkedFilters.filter(
          (e) => e !== action.payload
        );
      } else {
        state.checkedFilters.push(action.payload);
      }
    },
    toggleAllItems: (state) => {
      if (state.checkedFilters.length < 4) {
        state.checkedFilters = ['0', '1', '2', '3'];
      } else {
        state.checkedFilters = [];
      }
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: {
    [getTickets.pending]: (state) => {
      state.isLoading = true;
    },
    [getTickets.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [getTickets.fulfilled]: (state, action) => {
      state.errorMessage = '';
      state.tickets = action.payload;
      state.isLoading = false;
    },
    [getSearchId.fulfilled]: (state, action) => {
      state.searchId = action.payload;
    },
  },
});

export const { changeSort, toggleAllItems, toggleItem, showMore, errorNull } =
  ticketSlice.actions;
export default ticketSlice.reducer;
