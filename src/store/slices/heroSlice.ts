import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLiveDarshan = createAsyncThunk(
  "hero/fetchLiveDarshan",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/live-darshan");

      if (!response.ok) {
        throw new Error("Failed to fetch live darshan");
      }

      const result = await response.json();

      return result.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch live darshan",
      );
    }
  },
);

export interface DarshanTiming {
  id: string;
  day_of_week: string;
  opening_time: string;
  closing_time: string;
  label: string;
  is_active: boolean;
}

interface Darshan {
  templeName: string;
  location: string;
  label: string;
  hours: number;
  minutes: number;
  seconds: number;
  date: string;

  timings: DarshanTiming[];
  nextDarshan: DarshanTiming | null;
}

interface HeroState {
  heroTemple: string;
  darshan: Darshan;
  loading: boolean;
  error: string | null;
}

const initialState: HeroState = {
  heroTemple: "",

  darshan: {
    templeName: "",
    location: "",
    label: "",
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: "",

    timings: [],
    nextDarshan: null,
  },

  loading: false,
  error: null,
};

const heroSlice = createSlice({
  name: "hero",
  initialState,

  reducers: {
    tickCountdown(state) {
      if (state.darshan.seconds > 0) {
        state.darshan.seconds -= 1;
      } else if (state.darshan.minutes > 0) {
        state.darshan.minutes -= 1;
        state.darshan.seconds = 59;
      } else if (state.darshan.hours > 0) {
        state.darshan.hours -= 1;
        state.darshan.minutes = 59;
        state.darshan.seconds = 59;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveDarshan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchLiveDarshan.fulfilled, (state, action) => {
        state.loading = false;

        state.heroTemple = action.payload.templeName;

        state.darshan = action.payload;
      })

      .addCase(fetchLiveDarshan.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as string) ?? "Failed to fetch live darshan";
      });
  },
});

export const { tickCountdown } = heroSlice.actions;

export default heroSlice.reducer;
