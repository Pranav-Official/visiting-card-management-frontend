import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../context/userSlice';
import userDetailsReducer from '../context/userDetailsSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    userDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
