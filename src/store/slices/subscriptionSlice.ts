import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
}

const initialState: SubscriptionState = {
  plans: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,

  reducers: {},

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

export default subscriptionSlice.reducer;
