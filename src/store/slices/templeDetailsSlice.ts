import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

export const getTempleDetails = createAsyncThunk(
  "templeDetails/fetch",
  async (slug: string) => {
    const response = await fetch(`/api/temples/${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetch temple details");
    }

    const result = await response.json();

    return result.data;
  },
  {
    condition: (slug, { getState }) => {
      const state = getState() as RootState;
      const { currentSlug, loading, temple } = state.templeDetails;

      // Do not call the API again for the currently cached temple.
      if (loading || (currentSlug === slug && temple)) {
        return false;
      }

      return true;
    },
  },
);

interface TempleDetailsState {
  temple: any | null;
  timings: any[];
  alerts: any[];
  loading: boolean;
  error: string | null;
  currentSlug: string | null;
}

const initialState: TempleDetailsState = {
  temple: null,
  timings: [],
  alerts: [],
  loading: false,
  error: null,
  currentSlug: null,
};

const templeDetailsSlice = createSlice({
  name: "templeDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTempleDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTempleDetails.fulfilled, (state, action) => {
        state.loading = false;

        state.temple = action.payload.temple;
        state.timings = action.payload.timings ?? [];
        state.alerts = action.payload.alerts ?? [];

        // Save the slug used for this API request.
        state.currentSlug = action.meta.arg;
      })
      .addCase(getTempleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch temple details";
      });
  },
});

export default templeDetailsSlice.reducer;
