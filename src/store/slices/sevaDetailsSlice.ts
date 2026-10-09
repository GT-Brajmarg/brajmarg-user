import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSevaDetails = createAsyncThunk(
  "sevaDetails/fetch",
  async ({ templeId, sevaId }: { templeId: string; sevaId: string }) => {
    const res = await fetch(`/api/seva/${templeId}/${sevaId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch seva");
    }

    const json = await res.json();

    return json.data;
  },
);

interface State {
  seva: any;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  seva: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "sevaDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSevaDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSevaDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.seva = action.payload;
      })
      .addCase(fetchSevaDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default slice.reducer;
