// store/slices/frameBookingSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//
// =======================================
// THUNKS
// =======================================
//

export const fetchFrameDetails = createAsyncThunk(
  "frameBooking/fetchFrameDetails",
  async (frameId: string) => {
    const res = await fetch(`/api/frame/details/${frameId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch frame details");
    }

    const json = await res.json();

    return json.data;
  },
);

export const fetchFrameSizes = createAsyncThunk(
  "frameBooking/fetchFrameSizes",
  async (frameId: string) => {
    const res = await fetch(`/api/frame/sizes/${frameId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch frame sizes");
    }

    const json = await res.json();

    return json.data;
  },
);

export const fetchFrameMaterials = createAsyncThunk(
  "frameBooking/fetchFrameMaterials",
  async (frameId: string) => {
    const res = await fetch(`/api/frame/materials/${frameId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch frame materials");
    }

    const json = await res.json();

    return json.data;
  },
);

export const registerFrameOrder = createAsyncThunk(
  "frameBooking/registerFrameOrder",
  async (payload: any) => {
    const res = await fetch("/api/frame/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to place frame order");
    }

    const json = await res.json();

    return json.data;
  },
);

//
// =======================================
// STATE
// =======================================
//

interface FrameBookingState {
  frame: any;
  sizes: any[];
  materials: any[];
  order: any;

  loading: boolean;
  error: string | null;
}

const initialState: FrameBookingState = {
  frame: null,
  sizes: [],
  materials: [],
  order: null,

  loading: false,
  error: null,
};

//
// =======================================
// SLICE
// =======================================
//

const frameBookingSlice = createSlice({
  name: "frameBooking",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      //
      // DETAILS
      //

      .addCase(fetchFrameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchFrameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.frame = action.payload;
      })

      .addCase(fetchFrameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      //
      // SIZES
      //

      .addCase(fetchFrameSizes.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchFrameSizes.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload;
      })

      .addCase(fetchFrameSizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      //
      // MATERIALS
      //

      .addCase(fetchFrameMaterials.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchFrameMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload;
      })

      .addCase(fetchFrameMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      //
      // REGISTER
      //

      .addCase(registerFrameOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerFrameOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(registerFrameOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default frameBookingSlice.reducer;
