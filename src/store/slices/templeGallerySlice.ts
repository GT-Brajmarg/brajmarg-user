import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface TempleGalleryItem {
  id: string;
  temple_id: string;
  image_url: string;
  sort_order: number;
  title: string | null;
  alt_text: string | null;
  created_at: string;
}

interface TempleGalleryState {
  gallery: TempleGalleryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: TempleGalleryState = {
  gallery: [],
  loading: false,
  error: null,
};

export const getTempleGallery = createAsyncThunk<
  TempleGalleryItem[],
  string,
  { rejectValue: string }
>("templeGallery/getTempleGallery", async (templeId, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/temple-gallery?templeId=${templeId}`, {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return rejectWithValue(
        result.message || "Failed to fetch temple gallery",
      );
    }

    return result.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch temple gallery");
  }
});

const templeGallerySlice = createSlice({
  name: "templeGallery",
  initialState,
  reducers: {
    clearTempleGallery: (state) => {
      state.gallery = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTempleGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTempleGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.gallery = action.payload;
      })
      .addCase(getTempleGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch temple gallery";
      });
  },
});

export const { clearTempleGallery } = templeGallerySlice.actions;

export default templeGallerySlice.reducer;
