import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import burgerSlice from "./slices/burgerSlice";
import modalSlice from "./slices/modalSlice";
import subscriptionSlice from "./slices/subscriptionSlice";
import purchaseSlice from "./slices/purchaseSlice";
import settingsSlice from "./slices/settingsSlice";

const rootReducer = combineReducers({
  burgerSlice,
  modalSlice,
  subscriptionSlice,
  purchaseSlice,
  settingsSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
