import { createSlice } from '@reduxjs/toolkit';

type Card = {
  card_id: string;
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

type PendingCards = {
  user_email: string;
  user_id: string;
  user_fullname: string;
  cards: Card[];
};

type PendingCardsState = {
  pendingCardList: PendingCards[];
};

const initialState: PendingCardsState = {
  pendingCardList: [],
};

export const pendingCardsSlice = createSlice({
  name: 'pendingCards',
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.pendingCardList = action.payload;
    },
    removeCardById: (state, action) => {
      const updatedPendingCardList = state.pendingCardList.map(
        (pendingCard) => {
          const updatedCards = pendingCard.cards.filter(
            (card) => card.card_id !== action.payload.card_id,
          );
          return {
            ...pendingCard,
            cards: updatedCards,
          };
        },
      );
      const filteredPendingCardList = updatedPendingCardList.filter(
        (pendingCard) => pendingCard.cards.length > 0,
      );
      state.pendingCardList = filteredPendingCardList;
    },
  },
});

export const { setCards, removeCardById } = pendingCardsSlice.actions;

export default pendingCardsSlice.reducer;
