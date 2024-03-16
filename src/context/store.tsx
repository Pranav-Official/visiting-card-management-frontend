import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../context/userSlice';
import userDetailsReducer from '../context/userDetailsSlice';
import pendingCardsReducer from '../context/pendingCardsSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    userDetailsReducer,
    pendingCardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
