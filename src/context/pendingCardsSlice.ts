import { createSlice } from '@reduxjs/toolkit';

type Cards = {
  card_id: string | null;
  card_name: string | null;
  company_name: string | null;
  company_website: string | null;
  contact_name: string | null;
  email: string | null;
  img_back_link: string | null;
  img_front_link: string | null;
  job_title: string | null;
  phone: string | null;
  user_id: string | null;
};

type PendingCardsState = {
  cards: Cards[];
};

const initialState: PendingCardsState = {
  cards: [],
};

export const pendingCardsSlice = createSlice({
  name: 'pendingCards',
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter(
        (card) => card.card_id !== action.payload.card_id,
      );
    },
  },
});

export const { setCards, removeCard } = pendingCardsSlice.actions;

export default pendingCardsSlice.reducer;
