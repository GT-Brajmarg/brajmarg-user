import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AccessOption {
  id: string;
  name: string;
  display_order: number;
}

interface RequestTemplePayload {
  temple_name: string;
  city: string;
  state: string;
  address: string;
  requester_name: string;
  requester_email: string;
  requested_access: string[];
}

interface RequestTempleState {
  accessOptions: AccessOption[];
  loading: boolean;
  submitting: boolean;
  success: boolean;
  error: string | null;
}

const initialState: RequestTempleState = {
  accessOptions: [],
  loading: false,
  submitting: false,
  success: false,
  error: null,
};

export const getTempleRequestAccessOptions = createAsyncThunk(
  "requestTemple/getAccessOptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/request-temple");

      const result = await response.json();

      if (!result.success) {
        return rejectWithValue(result.message);
      }

      return result.data;
    } catch {
      return rejectWithValue("Failed to load access options.");
    }
  },
);

export const submitTempleRequest = createAsyncThunk(
  "requestTemple/submit",
  async (payload: RequestTemplePayload, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/request-temple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        return rejectWithValue(result.message);
      }

      return result.data;
    } catch {
      return rejectWithValue("Failed to submit request.");
    }
  },
);

const requestTempleSlice = createSlice({
  name: "requestTemple",
  initialState,
  reducers: {
    resetTempleRequest(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTempleRequestAccessOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTempleRequestAccessOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.accessOptions = action.payload;
      })
      .addCase(getTempleRequestAccessOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(submitTempleRequest.pending, (state) => {
        state.submitting = true;
        state.success = false;
      })
      .addCase(submitTempleRequest.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(submitTempleRequest.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTempleRequest } = requestTempleSlice.actions;

export default requestTempleSlice.reducer;
