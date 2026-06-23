// store/slices/prasadSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTemplePrasad = createAsyncThunk(
  "prasad/fetchTemplePrasad",
  async (templeId: string) => {
    const response = await fetch(`/api/prasad/${templeId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch prasad");
    }

    const result = await response.json();

    return result.data;
  },
);

interface PrasadState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PrasadState = {
  items: [],
  loading: false,
  error: null,
};

const prasadSlice = createSlice({
  name: "prasad",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplePrasad.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplePrasad.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTemplePrasad.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch prasad";
      });
  },
});

export default prasadSlice.reducer;
