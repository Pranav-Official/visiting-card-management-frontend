import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type selectedCards = {
  selectedCardIds: string[];
};

const initialState: selectedCards = {
  selectedCardIds: [],
};

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    setSelectedCardIds: (state, action: PayloadAction<string[]>) => {
      state.selectedCardIds = action.payload;
    },
  },
});

export const { setSelectedCardIds } = selectedCardsSlice.actions;

export default selectedCardsSlice.reducer;
