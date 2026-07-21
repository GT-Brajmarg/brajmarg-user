// export default sevaBookingSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//
// ================================
// Fetch Seva Details
// ================================
//

export const fetchSevaDetails = createAsyncThunk(
  "sevaBooking/fetchDetails",
  async ({ slug, sevaId }: { slug: string; sevaId: string }) => {
    // console.log("THUNK START", { slug, sevaId });

    const res = await fetch(`/api/seva/${slug}/${sevaId}`);

    const json = await res.json();

    // console.log("THUNK RESPONSE", json);

    return json.data;
  },
);

//
// ================================
// Fetch Available Dates
// ================================
//

export const fetchAvailableDates = createAsyncThunk(
  "sevaBooking/fetchAvailableDates",
  async ({ templeId, sevaId }: { templeId: string; sevaId: string }) => {
    const res = await fetch(`/api/seva/${templeId}/${sevaId}/dates`);

    if (!res.ok) {
      throw new Error("Failed to fetch available dates");
    }

    const json = await res.json();

    return json.data as AvailableDate[];
  },
);

//
// ================================
// Fetch Available Slots
// ================================
//

export const fetchAvailableSlots = createAsyncThunk(
  "sevaBooking/fetchAvailableSlots",
  async ({
    templeId,
    sevaId,
    date,
  }: {
    templeId: string;
    sevaId: string;
    date: string;
  }) => {
    const res = await fetch(
      `/api/seva/${templeId}/${sevaId}/slots?date=${date}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch slots");
    }

    const json = await res.json();

    return json.data;
  },
);

export const bookSeva = createAsyncThunk(
  "sevaBooking/bookSeva",
  async (payload: {
    templeId: string;
    sevaItemId: string;
    slotId: string;
    registrationDate: string;
    devoteeName: string;
    devoteePhone: string;
    devoteeGotra?: string;
    bookingFor?: string;
    whatsappUpdates?: boolean;
    notes?: string;
  }) => {
    const res = await fetch("/api/seva-booking/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json.data;
  },
);

export const verifyPayment = createAsyncThunk(
  "sevaBooking/verifyPayment",
  async (payload: {
    registrationId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
  }) => {
    const res = await fetch("/api/seva-booking/payment/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json.data;
  },
);

export const fetchMyBookings = createAsyncThunk(
  "sevaBooking/fetchMyBookings",
  async () => {
    const res = await fetch("/api/seva-booking/my-bookings");

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json.data;
  },
);

export const cancelBooking = createAsyncThunk(
  "sevaBooking/cancelBooking",
  async (registrationId: string) => {
    const res = await fetch("/api/seva-booking/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registrationId,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json.data;
  },
);

//
// ================================
// State
// ================================
//

interface AvailableDate {
  id: string;
  available_date: string;
}

interface State {
  seva: any;
  dates: AvailableDate[];
  slots: any[];

  booking: any | null;
  myBookings: any[];

  loading: boolean;
  bookingLoading: boolean;

  error: string | null;
}

const initialState: State = {
  seva: null,
  dates: [],
  slots: [],

  booking: null,
  myBookings: [],

  loading: false,
  bookingLoading: false,

  error: null,
};

//
// ================================
// Slice
// ================================
//

const sevaBookingSlice = createSlice({
  name: "sevaBooking",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      //
      // Seva Details
      //
      .addCase(fetchSevaDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSevaDetails.fulfilled, (state, action) => {
        // console.log("Redux Payload:", action.payload);

        state.loading = false;
        state.seva = action.payload;
      })
      .addCase(fetchSevaDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch seva details";
      })

      //
      // Available Dates
      //
      .addCase(fetchAvailableDates.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAvailableDates.fulfilled, (state, action) => {
        state.loading = false;
        state.dates = action.payload;
      })

      .addCase(fetchAvailableDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch available dates";
      })

      //
      // Available Slots
      //
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
      })

      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch available slots";
      })

      //
      // Book Seva
      //
      .addCase(bookSeva.pending, (state) => {
        state.bookingLoading = true;
        state.error = null;
      })

      .addCase(bookSeva.fulfilled, (state, action) => {
        state.bookingLoading = false;
        state.booking = action.payload;
      })

      .addCase(bookSeva.rejected, (state, action) => {
        state.bookingLoading = false;
        state.error = action.error.message ?? "Booking failed";
      })

      //
      // Verify Payment
      //
      .addCase(verifyPayment.pending, (state) => {
        state.bookingLoading = true;
      })

      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.bookingLoading = false;
        state.booking = action.payload;
      })

      .addCase(verifyPayment.rejected, (state, action) => {
        state.bookingLoading = false;
        state.error = action.error.message ?? "Payment verification failed";
      })

      //
      // My Bookings
      //
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.myBookings = action.payload;
      })

      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to fetch bookings";
      })

      //
      // Cancel Booking
      //
      .addCase(cancelBooking.pending, (state) => {
        state.bookingLoading = true;
      })

      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookingLoading = false;

        state.myBookings = state.myBookings.map((booking) =>
          booking.id === action.payload.id ? action.payload : booking,
        );
      })

      .addCase(cancelBooking.rejected, (state, action) => {
        state.bookingLoading = false;
        state.error = action.error.message ?? "Cancellation failed";
      });
  },
});

export default sevaBookingSlice.reducer;
