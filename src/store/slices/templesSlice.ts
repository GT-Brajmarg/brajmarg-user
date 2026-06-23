import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Temple {
  id: string;
  name: string;
  location: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  is_coming_soon: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface TemplesState {
  temples: Temple[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  popularSearches: string[];
}

export const fetchTemples = createAsyncThunk(
  "temples/fetchTemples",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/temples");

      if (!response.ok) {
        throw new Error("Failed to fetch temples");
      }

      const result = await response.json();

      return result.data as Temple[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch temples",
      );
    }
  },
);

const initialState: TemplesState = {
  temples: [],
  loading: false,
  error: null,
  searchQuery: "",
  popularSearches: ["Nathdwara", "Khatu", "Jaipur", "Barsana", "Chittorgarh"],
};

const templesSlice = createSlice({
  name: "temples",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },

    clearTempleError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTemples.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTemples.fulfilled, (state, action) => {
        state.loading = false;
        state.temples = action.payload;
      })

      .addCase(fetchTemples.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to fetch temples";
      });
  },
});

export const { setSearchQuery, clearTempleError } = templesSlice.actions;

export default templesSlice.reducer;
