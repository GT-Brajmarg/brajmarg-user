import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPrasadDetails = createAsyncThunk(
  "prasadBooking/fetchDetails",
  async (prasadId: string) => {
    const res = await fetch(`/api/prasad/details/${prasadId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch prasad details");
    }

    const json = await res.json();

    return json.data;
  },
);

export const fetchPrasadQuantities = createAsyncThunk(
  "prasadBooking/fetchQuantities",
  async (prasadId: string) => {
    const res = await fetch(`/api/prasad/details/${prasadId}/quantities`);

    if (!res.ok) {
      throw new Error("Failed to fetch quantity options");
    }

    const json = await res.json();

    return json.data;
  },
);

interface PrasadBookingState {
  prasad: any;
  quantities: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PrasadBookingState = {
  prasad: null,
  quantities: [],
  loading: false,
  error: null,
};

const prasadBookingSlice = createSlice({
  name: "prasadBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrasadDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrasadDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.prasad = action.payload;
      })
      .addCase(fetchPrasadDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(fetchPrasadQuantities.fulfilled, (state, action) => {
        state.quantities = action.payload;
      });
  },
});

export default prasadBookingSlice.reducer;
