// store/slices/templeTimingsSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface TempleTiming {
  id: string;
  temple_id: string;
  day_of_week: string;
  opening_time: string;
  closing_time: string;
  label: string | null;
  special_note: string | null;
  is_active: boolean;
}

interface TempleTimingsState {
  timings: TempleTiming[];
  loading: boolean;
  error: string | null;
}

const initialState: TempleTimingsState = {
  timings: [],
  loading: false,
  error: null,
};

export const fetchTempleTimings = createAsyncThunk(
  "templeTimings/fetchTempleTimings",
  async (templeId: string) => {
    const response = await fetch(`/api/temple-timings/${templeId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch temple timings");
    }

    const result = await response.json();

    return result.data;
  },
);

const templeTimingsSlice = createSlice({
  name: "templeTimings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTempleTimings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTempleTimings.fulfilled, (state, action) => {
        state.loading = false;
        state.timings = action.payload;
      })
      .addCase(fetchTempleTimings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default templeTimingsSlice.reducer;
