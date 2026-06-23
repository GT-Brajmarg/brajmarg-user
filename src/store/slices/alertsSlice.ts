import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Alert {
  id: string;
  temple_id: string | null;
  alert_type: string;
  priority: string;
  title: string;
  description: string;
  starts_at: string;
  ends_at: string | null;
  is_active: boolean;
}

interface AlertsState {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
}

export const fetchAlerts = createAsyncThunk("alerts/fetchAlerts", async () => {
  const response = await fetch("/api/alerts");

  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }

  const result = await response.json();

  return result.data as Alert[];
});

const initialState: AlertsState = {
  alerts: [],
  loading: false,
  error: null,
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts = action.payload;
      })

      .addCase(fetchAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default alertsSlice.reducer;
