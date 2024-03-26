import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import userDetailsReducer from './userDetailsSlice';
import pendingCardsReducer from './pendingCardsSlice';
import selectedCardReducer from './selectedCardsSlice';
import sharingProcessReducer from './sharingProcessSlice';

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
