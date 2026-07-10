import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  Address,
  AddressApiResponse,
  AddressPayload,
} from "@/types/address.types";

type AddressState = {
  addresses: Address[];
  selectedAddressId: string | null;
  loading: boolean;
  saving: boolean;
  deletingId: string | null;
  error: string | null;
};

const initialState: AddressState = {
  addresses: [],
  selectedAddressId: null,
  loading: false,
  saving: false,
  deletingId: null,
  error: null,
};

function authHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("biocog_token") : null;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const fetchAddresses = createAsyncThunk<
  Address[],
  void,
  { rejectValue: string }
>("addresses/fetchAddresses", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/addresses", {
      headers: authHeaders(),
    });

    const result: AddressApiResponse<Address[]> = await response.json();

    if (!response.ok || !result.success) {
      return rejectWithValue(
        result.message || "Unable to fetch saved addresses.",
      );
    }

    return result.data;
  } catch {
    return rejectWithValue("Unable to fetch saved addresses.");
  }
});

export const createAddress = createAsyncThunk<
  Address,
  AddressPayload,
  { rejectValue: string }
>("addresses/createAddress", async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/addresses", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });

    const result: AddressApiResponse<Address> = await response.json();

    if (!response.ok || !result.success) {
      return rejectWithValue(result.message || "Unable to save address.");
    }

    return result.data;
  } catch {
    return rejectWithValue("Unable to save address.");
  }
});

export const updateAddress = createAsyncThunk<
  Address,
  {
    addressId: string;
    payload: AddressPayload;
  },
  { rejectValue: string }
>(
  "addresses/updateAddress",
  async ({ addressId, payload }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/addresses/${addressId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      const result: AddressApiResponse<Address> = await response.json();

      if (!response.ok || !result.success) {
        return rejectWithValue(result.message || "Unable to update address.");
      }

      return result.data;
    } catch {
      return rejectWithValue("Unable to update address.");
    }
  },
);

export const deleteAddress = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("addresses/deleteAddress", async (addressId, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/addresses/${addressId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    const result: AddressApiResponse<{ id: string }> = await response.json();

    if (!response.ok || !result.success) {
      return rejectWithValue(result.message || "Unable to delete address.");
    }

    return result.data.id;
  } catch {
    return rejectWithValue("Unable to delete address.");
  }
});

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    selectAddress(state, action: PayloadAction<string | null>) {
      state.selectedAddressId = action.payload;
    },

    clearAddressError(state) {
      state.error = null;
    },

    resetAddresses(state) {
      state.addresses = [];
      state.selectedAddressId = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;

        const selectedStillExists = action.payload.some(
          (address) => address.id === state.selectedAddressId,
        );

        if (!selectedStillExists) {
          state.selectedAddressId =
            action.payload.find((address) => address.isDefault)?.id ??
            action.payload[0]?.id ??
            null;
        }
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch saved addresses.";
      })

      .addCase(createAddress.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.saving = false;

        if (action.payload.isDefault) {
          state.addresses = state.addresses.map((address) => ({
            ...address,
            isDefault: false,
          }));
        }

        state.addresses.unshift(action.payload);
        state.selectedAddressId = action.payload.id;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || "Unable to save address.";
      })

      .addCase(updateAddress.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.saving = false;

        if (action.payload.isDefault) {
          state.addresses = state.addresses.map((address) => ({
            ...address,
            isDefault: address.id === action.payload.id,
          }));
        } else {
          state.addresses = state.addresses.map((address) =>
            address.id === action.payload.id ? action.payload : address,
          );
        }

        state.selectedAddressId = action.payload.id;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || "Unable to update address.";
      })

      .addCase(deleteAddress.pending, (state, action) => {
        state.deletingId = action.meta.arg;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.deletingId = null;

        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload,
        );

        if (state.selectedAddressId === action.payload) {
          state.selectedAddressId =
            state.addresses.find((address) => address.isDefault)?.id ??
            state.addresses[0]?.id ??
            null;
        }
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.payload || "Unable to delete address.";
      });
  },
});

export const { selectAddress, clearAddressError, resetAddresses } =
  addressSlice.actions;

export default addressSlice.reducer;
