// store/slices/offeringSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTempleOfferings = createAsyncThunk(
  "offerings/fetchTempleOfferings",
  async (templeId: string) => {
    const response = await fetch(`/api/offerings/${templeId}`);

    const result = await response.json();

    return result.data;
  },
);

interface OfferingState {
  offerings: any[];
  loading: boolean;
  error: string | null;
}

const initialState: OfferingState = {
  offerings: [],
  loading: false,
  error: null,
};

const offeringSlice = createSlice({
  name: "offerings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTempleOfferings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTempleOfferings.fulfilled, (state, action) => {
        state.loading = false;
        state.offerings = action.payload;
      })
      .addCase(fetchTempleOfferings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch offerings";
      });
  },
});

export default offeringSlice.reducer;
