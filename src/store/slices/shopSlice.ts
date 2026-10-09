import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface FetchShopProductsPayload {
  categories?: string[];
  collection?: string;
  query?: string;
}

export const fetchShopProducts = createAsyncThunk(
  "shop/fetchProducts",
  async ({ categories = [], collection, query }: FetchShopProductsPayload) => {
    const params = new URLSearchParams();

    categories.forEach((category) => {
      params.append("category", category);
    });

    if (collection) {
      params.append("collection", collection);
    }

    if (query) {
      params.append("q", query);
    }

    const res = await fetch(`/api/shop?${params.toString()}`);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const json = await res.json();

    return json.data;
  },
);

interface ShopState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ShopState = {
  items: [],
  loading: false,
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchShopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default shopSlice.reducer;
