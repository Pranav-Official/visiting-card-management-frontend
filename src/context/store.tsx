import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../context/userSlice';
import userDetailsReducer from '../context/userDetailsSlice';
import pendingCardsReducer from '../context/pendingCardsSlice';
import selectedCardReducer from '../context/selectedCardsSlice';
import sharingProcessReducer from '../context/sharingProcessSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    userDetailsReducer,
    pendingCardsReducer,
    selectedCardReducer,
    sharingProcessReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
