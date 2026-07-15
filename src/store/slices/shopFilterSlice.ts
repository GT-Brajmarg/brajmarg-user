import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchShopFilters = createAsyncThunk(
  "shopFilters/fetch",
  async (categories: string[]) => {
    const params = new URLSearchParams();

    categories.forEach((category) => params.append("category", category));

    const res = await fetch(`/api/shop/filters?${params.toString()}`);

    if (!res.ok) {
      throw new Error("Failed to fetch filters");
    }

    const json = await res.json();

    return json.data;
  },
);

interface ShopFilterState {
  materials: string[];
  sizes: string[];
  colors: string[];
  quantities: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ShopFilterState = {
  materials: [],
  sizes: [],
  colors: [],
  quantities: [],
  loading: false,
  error: null,
};

const shopFilterSlice = createSlice({
  name: "shopFilters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShopFilters.fulfilled, (state, action) => {
        state.loading = false;

        state.materials = action.payload.materials;
        state.sizes = action.payload.sizes;
        state.colors = action.payload.colors;
        state.quantities = action.payload.quantities;
      })
      .addCase(fetchShopFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default shopFilterSlice.reducer;
