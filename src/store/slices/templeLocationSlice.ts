import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TempleLocation {
  id: string;
  temple_id: string;
  temple_name: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  google_maps_url: string;
  map_image_url: string;
}

interface NearbyPlace {
  id: string;
  place_name: string;
  distance: string;
  sort_order: number;
}

interface TempleLocationState {
  location: TempleLocation | null;
  nearbyPlaces: NearbyPlace[];
  loading: boolean;
  error: string | null;
}

const initialState: TempleLocationState = {
  location: null,
  nearbyPlaces: [],
  loading: false,
  error: null,
};

export const getTempleLocation = createAsyncThunk(
  "templeLocation/getTempleLocation",
  async (templeId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/temple-location?templeId=${templeId}`,
        {
          cache: "no-store",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        return rejectWithValue(result.message);
      }

      return result.data;
    } catch {
      return rejectWithValue("Failed to fetch temple location");
    }
  },
);

const templeLocationSlice = createSlice({
  name: "templeLocation",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getTempleLocation.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTempleLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload.location;
        state.nearbyPlaces = action.payload.nearbyPlaces;
      })

      .addCase(getTempleLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default templeLocationSlice.reducer;
