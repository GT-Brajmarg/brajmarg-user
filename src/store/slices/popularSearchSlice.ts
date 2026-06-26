import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PopularSearch {
  id: string;
  name: string;
  is_active: boolean;
  display_order: number;
}

interface PopularSearchState {
  searches: PopularSearch[];
  loading: boolean;
  error: string | null;
}

const initialState: PopularSearchState = {
  searches: [],
  loading: false,
  error: null,
};

export const fetchPopularSearches = createAsyncThunk(
  "popularSearches/fetchPopularSearches",
  async () => {
    const response = await fetch("/api/popular-searches");

    if (!response.ok) {
      throw new Error("Failed to fetch popular searches");
    }

    return await response.json();
  },
);

const popularSearchSlice = createSlice({
  name: "popularSearches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularSearches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularSearches.fulfilled, (state, action) => {
        state.loading = false;
        state.searches = action.payload;
      })
      .addCase(fetchPopularSearches.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch popular searches";
      });
  },
});

export default popularSearchSlice.reducer;
