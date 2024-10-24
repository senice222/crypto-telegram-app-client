import { TSubscriptionType } from "@/services/api/SubscriptionService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TBlockchains = "BTC" | "ETH" | "USDT" | "LTC" | "SOL" | "BNB";

export interface IPlatinumTariff {
  subscriptionType: "platinum";
  blockchains?: undefined;
  promocode: string;
  discount: number;
  subscriptionId: number;
}

export interface INonPlatinumTariff {
  subscriptionType: TSubscriptionType;
  blockchains: TBlockchains[];
  promocode: string;
  discount: number;
  subscriptionId: number;
}

export type TSelectedTariff = IPlatinumTariff | INonPlatinumTariff;

export interface IPurchaseSlice {
  selectedTariff: TSelectedTariff | null;
}

const initialState: IPurchaseSlice = {
  selectedTariff: null,
};

export const purchaseSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setSelectedTariffData: (
      state,
      action: PayloadAction<Partial<TSelectedTariff>>
    ) => {
      if (state.selectedTariff) {
        Object.assign(state.selectedTariff, action.payload);
      } else {
        if ("subscriptionType" in action.payload) {
          if (action.payload.subscriptionType === "platinum") {
            state.selectedTariff = {
              subscriptionType: "platinum",
              promocode: action.payload.promocode || "",
              discount: action.payload.discount || 0,
              subscriptionId: action.payload.subscriptionId || -1,
            };
          } else {
            state.selectedTariff = {
              subscriptionType: action.payload.subscriptionType as Exclude<
                TSubscriptionType,
                "platinum"
              >,
              blockchains: action.payload.blockchains || [],
              promocode: action.payload.promocode || "",
              discount: action.payload.discount || 0,
              subscriptionId: action.payload.subscriptionId || -1,
            };
          }
        } else {
          console.warn("subscriptionType is required to set selectedTariff.");
        }
      }
    },
  },
});

export default purchaseSlice.reducer;
