import { createAsyncThunk } from "@reduxjs/toolkit";

export interface AvailableDate {
  id: string;
  available_date: string;
}

export interface SevaType {
  name: string;
}

export interface Temple {
  id: string;
  name: string;
  location: string;
  image_url?: string;
}

export interface FeaturedSeva {
  id: string;
  temple_id: string;
  name: string;
  price: number;
  time?: string;
  details?: string;
  significance?: string;
  image_url?: string;
  seva_type: string;
  allow_cod: boolean;
  allow_direct_payment: boolean;
  temples: Temple;
}

export interface SevaPageState {
  dates: AvailableDate[];

  sevaTypes: SevaType[];

  featuredSevas: FeaturedSeva[];

  selectedDate: string | null;

  selectedSevaType: string | null;

  loading: boolean;

  error: string | null;
}

export const initialState: SevaPageState = {
  dates: [],

  sevaTypes: [],

  featuredSevas: [],

  selectedDate: null,

  selectedSevaType: null,

  loading: false,

  error: null,
};

//
// Fetch Dates
//

export const fetchAvailableDates = createAsyncThunk(
  "sevaPage/fetchAvailableDates",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/seva-page/dates");

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      return json.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Unable to fetch dates.",
      );
    }
  },
);

export const fetchSevaTypes = createAsyncThunk(
  "sevaPage/fetchSevaTypes",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/seva-page/types");

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      return json.data.map((type: string) => ({
        name: type,
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Unable to fetch seva types.",
      );
    }
  },
);

//
// Fetch Featured Sevas
//

export const fetchFeaturedSevas = createAsyncThunk(
  "sevaPage/fetchFeaturedSevas",
  async (
    {
      date,
      sevaType,
    }: {
      date?: string;
      sevaType?: string;
    },
    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams();

      if (date) {
        params.append("date", date);
      }

      if (sevaType) {
        params.append("sevaType", sevaType);
      }

      const url = params.toString()
        ? `/api/seva-page/featured?${params.toString()}`
        : "/api/seva-page/featured";

      const res = await fetch(url);

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      return json.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : "Unable to fetch featured sevas.",
      );
    }
  },
);

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const sevaPageSlice = createSlice({
  name: "sevaPage",

  initialState,

  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },

    setSelectedSevaType: (state, action: PayloadAction<string | null>) => {
      state.selectedSevaType = action.payload;
    },

    clearFilters: (state) => {
      state.selectedDate = null;
      state.selectedSevaType = null;
    },
  },

  extraReducers: (builder) => {
    builder

      //
      // Fetch Dates
      //
      .addCase(fetchAvailableDates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAvailableDates.fulfilled, (state, action) => {
        state.loading = false;
        state.dates = action.payload;
      })

      .addCase(fetchAvailableDates.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Unable to fetch dates.";
      })

      //
      // Fetch Seva Types
      //
      .addCase(fetchSevaTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSevaTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.sevaTypes = action.payload;
      })

      .addCase(fetchSevaTypes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Unable to fetch seva types.";
      })

      //
      // Featured Sevas
      //
      .addCase(fetchFeaturedSevas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchFeaturedSevas.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredSevas = action.payload;
      })

      .addCase(fetchFeaturedSevas.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Unable to fetch featured sevas.";
      });
  },
});

export const { setSelectedDate, setSelectedSevaType, clearFilters } =
  sevaPageSlice.actions;

export default sevaPageSlice.reducer;
