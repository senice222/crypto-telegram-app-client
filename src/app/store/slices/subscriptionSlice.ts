import { IHTTPSubscription } from "@/services/api/SubscriptionService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISubscriptionSlice {
  availableSubscriptions: IHTTPSubscription[];
}

const initialState: ISubscriptionSlice = {
  availableSubscriptions: [],
};

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    setAvailableSubscriptions: (
      state,
      action: PayloadAction<IHTTPSubscription[]>
    ) => {
      state.availableSubscriptions = action.payload;
    },
  },
});

export default subscriptionSlice.reducer;
