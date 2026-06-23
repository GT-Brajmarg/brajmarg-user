// store/slices/sevaSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTempleSevas = createAsyncThunk(
  "sevas/fetchTempleSevas",
  async (templeId: string) => {
    const response = await fetch(`/api/seva/${templeId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch sevas");
    }

    const result = await response.json();

    return result.data;
  },
);

interface SevaState {
  sevas: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SevaState = {
  sevas: [],
  loading: false,
  error: null,
};

const sevaSlice = createSlice({
  name: "sevas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTempleSevas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTempleSevas.fulfilled, (state, action) => {
        state.loading = false;
        state.sevas = action.payload;
      })
      .addCase(fetchTempleSevas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch sevas";
      });
  },
});

export default sevaSlice.reducer;
