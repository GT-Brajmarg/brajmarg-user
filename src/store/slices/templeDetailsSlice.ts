import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTempleDetails = createAsyncThunk(
  "templeDetails/fetch",
  async (templeId: string) => {
    const response = await fetch(`/api/temples/${templeId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch temple details");
    }

    const result = await response.json();

    return result.data;
  },
);

interface TempleDetailsState {
  temple: any | null;
  timings: any[];
  alerts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TempleDetailsState = {
  temple: null,
  timings: [],
  alerts: [],
  loading: false,
  error: null,
};

const templeDetailsSlice = createSlice({
  name: "templeDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTempleDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTempleDetails.fulfilled, (state, action) => {
        state.loading = false;

        state.temple = action.payload.temple;
        state.timings = action.payload.timings;
        state.alerts = action.payload.alerts;
      })
      .addCase(getTempleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed";
      });
  },
});

export default templeDetailsSlice.reducer;
