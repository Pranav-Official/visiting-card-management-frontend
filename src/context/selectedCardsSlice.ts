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
    removeSelectedCardId: (state, action: PayloadAction<string>) => {
      state.selectedCardIds = state.selectedCardIds.filter(
        (card_id) => card_id != action.payload,
      );
    },
    removeAllSelectedCards: (state) => {
      state.selectedCardIds = initialState.selectedCardIds;
    },
  },
});

export const {
  setSelectedCardIds,
  removeSelectedCardId,
  removeAllSelectedCards,
} = selectedCardsSlice.actions;

export default selectedCardsSlice.reducer;
