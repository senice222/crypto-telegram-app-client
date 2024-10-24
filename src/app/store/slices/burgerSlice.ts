import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TBurgerStates = "navigation" | "select-language" | null;
export interface IBurgerSlice {
  burgerState: TBurgerStates;
}

const initialState: IBurgerSlice = {
  burgerState: null,
};

export const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    setBurgerState: (state, action: PayloadAction<TBurgerStates>) => {
      state.burgerState = action.payload;
    },
  },
});

export default burgerSlice.reducer;
