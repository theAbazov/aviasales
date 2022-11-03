import { configureStore } from '@reduxjs/toolkit';

import ticketSlice from './ticketSlice';

const store = configureStore({
  reducer: {
    AVS: ticketSlice,
  },
});

export default store;
