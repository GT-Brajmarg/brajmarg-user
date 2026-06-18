import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import homeReducer from "./slices/homeSlice";
import heroReducer from "./slices/heroSlice";
import templesReducer from "./slices/templesSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    home: homeReducer,
    hero: heroReducer,
    temples: templesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
