import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//
// =======================================
// THUNKS
// =======================================
//

export const fetchClothDetails = createAsyncThunk(
  "clothBooking/fetchClothDetails",
  async (clothId: string) => {
    const res = await fetch(`/api/cloth/details/${clothId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch cloth details");
    }

    const json = await res.json();

    return json.data;
  },
);

export const fetchClothSizes = createAsyncThunk(
  "clothBooking/fetchClothSizes",
  async (clothId: string) => {
    const res = await fetch(`/api/cloth/sizes/${clothId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch cloth sizes");
    }

    const json = await res.json();

    return json.data;
  },
);

export const fetchClothColors = createAsyncThunk(
  "clothBooking/fetchClothColors",
  async (clothId: string) => {
    const res = await fetch(`/api/cloth/colors/${clothId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch cloth colors");
    }

    const json = await res.json();

    return json.data;
  },
);

export const registerClothOrder = createAsyncThunk(
  "clothBooking/registerClothOrder",
  async (payload: any) => {
    const res = await fetch("/api/cloth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to place cloth order");
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

interface ClothBookingState {
  cloth: any;
  sizes: any[];
  colors: any[];
  order: any;

  loading: boolean;
  error: string | null;
}

const initialState: ClothBookingState = {
  cloth: null,
  sizes: [],
  colors: [],
  order: null,

  loading: false,
  error: null,
};

//
// =======================================
// SLICE
// =======================================
//

const clothBookingSlice = createSlice({
  name: "clothBooking",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      //
      // DETAILS
      //

      .addCase(fetchClothDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchClothDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cloth = action.payload;
      })

      .addCase(fetchClothDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      //
      // SIZES
      //

      .addCase(fetchClothSizes.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchClothSizes.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload;
      })

      .addCase(fetchClothSizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      //
      // COLORS
      //

      .addCase(fetchClothColors.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchClothColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload;
      })

      .addCase(fetchClothColors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      //
      // REGISTER
      //

      .addCase(registerClothOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerClothOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(registerClothOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default clothBookingSlice.reducer;
