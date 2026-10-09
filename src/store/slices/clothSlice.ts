import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTempleCloths = createAsyncThunk(
  "cloth/fetchTempleCloths",
  async (templeId: string) => {
    const res = await fetch(`/api/cloth/${templeId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch cloths");
    }

    const json = await res.json();

    return json.data;
  },
);

interface ClothItem {
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

interface ClothState {
  items: ClothItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ClothState = {
  items: [],
  loading: false,
  error: null,
};

const clothSlice = createSlice({
  name: "cloth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTempleCloths.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTempleCloths.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTempleCloths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default clothSlice.reducer;
