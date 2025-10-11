// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ticketReducer from './ticketSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tickets: ticketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
