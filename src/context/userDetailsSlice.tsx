import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDetailsState {
  token: string;
  user_id: string;
}
const initialState: UserDetailsState = {
  token: '',
  user_id: '',
};
export const userDetailsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDetails(
      state: UserDetailsState,
      action: PayloadAction<UserDetailsState>,
    ) {
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
    },
  },
});

export const { userDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
