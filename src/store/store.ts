import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import homeReducer from "./slices/homeSlice";
import heroReducer from "./slices/heroSlice";
import templesReducer from "./slices/templesSlice";
import alertsReducer from "./slices/alertsSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import templeDetailsReducer from "./slices/templeDetailsSlice";
import templeTimingsReducer from "./slices/templeTimingsSlice";
import sevaReducer from "./slices/sevaSlice";
import prasadReducer from "./slices/prasadSlice";
import offeringReducer from "./slices/offeringSlice";
import popularSearchReducer from "./slices/popularSearchSlice";
import templeGalleryReducer from "./slices/templeGallerySlice";
import templeLocationReducer from "./slices/templeLocationSlice";
import requestTempleReducer from "./slices/requestTempleSlice";
import sevaDetailsReducer from "./slices/sevaDetailsSlice";
import sevaBookingReducer from "./slices/sevaBookingSlice";
import prasadBookingReducer from "./slices/prasadBookingSlice";
import frameReducer from "./slices/frameSlice";
import frameBookingReducer from "./slices/frameBookingSlice";
import clothReducer from "./slices/clothSlice";
import clothBookingReducer from "./slices/clothBookingSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    home: homeReducer,
    hero: heroReducer,
    temples: templesReducer,
    alerts: alertsReducer,
    subscriptions: subscriptionReducer,
    templeDetails: templeDetailsReducer,
    templeTimings: templeTimingsReducer,
    sevas: sevaReducer,
    prasad: prasadReducer,
    offerings: offeringReducer,
    popularSearches: popularSearchReducer,
    templeGallery: templeGalleryReducer,
    templeLocation: templeLocationReducer,
    requestTemple: requestTempleReducer,
    sevaDetails: sevaDetailsReducer,
    sevaBooking: sevaBookingReducer,
    prasadBooking: prasadBookingReducer,
    frames: frameReducer,
    frameBooking: frameBookingReducer,
    cloths: clothReducer,
    clothBooking: clothBookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
