import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type sharingProcess = {
  sharingProcess: boolean;
};

const initialState: sharingProcess = {
  sharingProcess: false,
};

export const sharingProcessSlice = createSlice({
  name: 'sharingProcess',
  initialState,
  reducers: {
    setSharingProcess: (state, action: PayloadAction<boolean>) => {
      state.sharingProcess = action.payload;
    },
  },
});

export const { setSharingProcess } = sharingProcessSlice.actions;

export default sharingProcessSlice.reducer;
