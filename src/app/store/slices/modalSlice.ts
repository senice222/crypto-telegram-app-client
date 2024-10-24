import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TModals =
  | "select-language"
  | "choose-payment-method"
  | "card-payment"
  | "special-offer";

export interface IModalSlice {
  modal: TModals | null;
}

const initialState: IModalSlice = {
  modal: null,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<TModals | null>) => {
      state.modal = action.payload;
    },
  },
});

export default modalSlice.reducer;
