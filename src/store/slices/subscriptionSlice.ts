import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchPlans = createAsyncThunk(
  "subscriptions/fetchPlans",
  async () => {
    const response = await fetch("/api/subscriptions");

    const result = await response.json();

    return result.data;
  },
);

interface SubscriptionState {
  plans: any[];
  loading: boolean;
  error: string | null;

  selectedPlan: string;

  selectedTemples: string[];

  updateTypes: string[];

  frequency: string;

  language: string;

  notificationMethod: string;
}

const initialState: SubscriptionState = {
  plans: [],
  loading: false,
  error: null,

  selectedPlan: "",

  selectedTemples: [],

  updateTypes: [],

  frequency: "",

  language: "",

  notificationMethod: "",
};

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,

  reducers: {
    setSelectedPlan(state, action: PayloadAction<string>) {
      state.selectedPlan = action.payload;
    },

    setSelectedTemples(state, action: PayloadAction<string[]>) {
      state.selectedTemples = action.payload;
    },

    setUpdateTypes(state, action: PayloadAction<string[]>) {
      state.updateTypes = action.payload;
    },
    removeSelectedTemple(state, action: PayloadAction<string>) {
      state.selectedTemples = state.selectedTemples.filter(
        (temple) => temple !== action.payload,
      );
    },

    setFrequency(state, action: PayloadAction<string>) {
      state.frequency = action.payload;
    },

    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },

    setNotificationMethod(state, action: PayloadAction<string>) {
      state.notificationMethod = action.payload;
    },

    resetSubscription(state) {
      state.selectedPlan = "";
      state.selectedTemples = [];
      state.updateTypes = [];
      state.frequency = "";
      state.language = "";
      state.notificationMethod = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })

      .addCase(fetchPlans.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setSelectedPlan,
  setSelectedTemples,
  setUpdateTypes,
  setFrequency,
  setLanguage,
  setNotificationMethod,
  resetSubscription,
  removeSelectedTemple,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
