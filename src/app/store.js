import { configureStore } from '@reduxjs/toolkit';
import { authSlice, bookServiceSlice, homeSlice } from './slices';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    home: homeSlice,
    service: bookServiceSlice,
  },
});
