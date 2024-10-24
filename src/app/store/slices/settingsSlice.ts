import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISettings {
  telegramChat: string;
  telegramSupportId: number;
  windowsDownloadLink: string;
  iosDownloadLink: string;
  androidDownloadLink: string;
  referralActivationAmount: number;
  referralDiscount: number;
  windowsAppVersion: number;
  specialOfferTime: number;
}

export interface ISettingsSlice {
  settings: ISettings | null;
}

const initialState: ISettingsSlice = {
  settings: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<ISettings>) => {
      state.settings = action.payload;
    },
  },
});

export default settingsSlice.reducer;
