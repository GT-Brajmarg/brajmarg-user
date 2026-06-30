import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSevaDetails = createAsyncThunk(
  "sevaBooking/fetchDetails",
  async ({ slug, sevaId }: { slug: string; sevaId: string }) => {
    const res = await fetch(`/api/seva/${slug}/${sevaId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch seva");
    }

    const json = await res.json();

    return json.data;
  },
);

interface State {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

const sevaBookingSlice = createSlice({
  name: "sevaBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSevaDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSevaDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSevaDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default sevaBookingSlice.reducer;
