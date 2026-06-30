// store/slices/frameSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTempleFrames = createAsyncThunk(
  "frame/fetchTempleFrames",
  async (templeId: string) => {
    const res = await fetch(`/api/frame/${templeId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch frames");
    }

    const json = await res.json();

    return json.data;
  },
);

interface FrameItem {
  id: string;
  temple_id: string;
  name: string;
  description?: string;
  image_url: string;
  price: number;
  in_stock: boolean;
  allow_direct_payment: boolean;
  allow_cod: boolean;
  display_order: number;
}

interface FrameState {
  items: FrameItem[];
  loading: boolean;
  error: string | null;
}

const initialState: FrameState = {
  items: [],
  loading: false,
  error: null,
};

const frameSlice = createSlice({
  name: "frame",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTempleFrames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTempleFrames.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTempleFrames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default frameSlice.reducer;
