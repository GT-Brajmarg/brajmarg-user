// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchSevaDetails = createAsyncThunk(
//   "sevaBooking/fetchDetails",
//   async ({ slug, sevaId }: { slug: string; sevaId: string }) => {
//     const res = await fetch(`/api/seva/${slug}/${sevaId}`);

//     if (!res.ok) {
//       throw new Error("Failed to fetch seva");
//     }

//     const json = await res.json();

//     return json.data;
//   },
// );

// interface State {
//   seva: any;
//   dates: string[];
//   slots: any[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: State = {
//   seva: null,
//   dates: [],
//   slots: [],
//   loading: false,
//   error: null,
// };

// const sevaBookingSlice = createSlice({
//   name: "sevaBooking",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSevaDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSevaDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.seva = action.payload;
//       })
//       .addCase(fetchSevaDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Something went wrong";
//       });
//   },
// });

// export const fetchAvailableDates = createAsyncThunk(
//   "sevaBooking/fetchAvailableDates",
//   async ({ templeId, sevaId }: { templeId: string; sevaId: string }) => {
//     const res = await fetch(`/api/seva/${templeId}/${sevaId}/dates`);

//     const json = await res.json();

//     return json.data;
//   },
// );

// export const fetchAvailableSlots = createAsyncThunk(
//   "sevaBooking/fetchAvailableSlots",
//   async ({
//     templeId,
//     sevaId,
//     date,
//   }: {
//     templeId: string;
//     sevaId: string;
//     date: string;
//   }) => {
//     const res = await fetch(
//       `/api/seva/${templeId}/${sevaId}/slots?date=${date}`,
//     );

//     const json = await res.json();

//     return json.data;
//   },
// );

// export default sevaBookingSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//
// ================================
// Fetch Seva Details
// ================================
//

// export const fetchSevaDetails = createAsyncThunk(
//   "sevaBooking/fetchDetails",
//   async ({ slug, sevaId }: { slug: string; sevaId: string }) => {
//     const res = await fetch(`/api/seva/${slug}/${sevaId}`);

//     const json = await res.json();

//     console.log("Seva API Response:", json);

//     if (!res.ok) {
//       throw new Error(json.message || "Failed to fetch seva");
//     }

//     return json.data;
//   },
// );

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
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  seva: null,
  dates: [],
  slots: [],
  loading: false,
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
      });
  },
});

export default sevaBookingSlice.reducer;
