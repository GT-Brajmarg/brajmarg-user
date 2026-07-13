import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Address, AddressPayload } from "@/types/address.types";

type AddressRow = {
  id: string;
  user_id: string;
  label: "Home" | "Office" | "Other";
  full_name: string;
  mobile: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

const mapAddressRow = (row: AddressRow): Address => ({
  id: row.id,
  userId: row.user_id,
  label: row.label,
  fullName: row.full_name,
  mobile: row.mobile,
  addressLine1: row.address_line1,
  addressLine2: row.address_line2,
  city: row.city,
  state: row.state,
  pincode: row.pincode,
  isDefault: row.is_default,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const toAddressInsert = (userId: string, payload: AddressPayload) => ({
  user_id: userId,
  label: payload.label,
  full_name: payload.fullName.trim(),
  mobile: payload.mobile.trim(),
  address_line1: payload.addressLine1.trim(),
  address_line2: payload.addressLine2?.trim() || null,
  city: payload.city.trim(),
  state: payload.state.trim(),
  pincode: payload.pincode.trim(),
  is_default: payload.isDefault ?? false,
});

export async function getUserAddressesRepository(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as AddressRow[]).map(mapAddressRow);
}

export async function createUserAddressRepository(
  userId: string,
  payload: AddressPayload,
) {
  const { data, error } = await supabaseAdmin
    .from("user_addresses")
    .insert(toAddressInsert(userId, payload))
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapAddressRow(data as AddressRow);
}

export async function updateUserAddressRepository(
  userId: string,
  addressId: string,
  payload: AddressPayload,
) {
  const { data, error } = await supabaseAdmin
    .from("user_addresses")
    .update({
      label: payload.label,
      full_name: payload.fullName.trim(),
      mobile: payload.mobile.trim(),
      address_line1: payload.addressLine1.trim(),
      address_line2: payload.addressLine2?.trim() || null,
      city: payload.city.trim(),
      state: payload.state.trim(),
      pincode: payload.pincode.trim(),
      is_default: payload.isDefault ?? false,
    })
    .eq("id", addressId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapAddressRow(data as AddressRow);
}

export async function deleteUserAddressRepository(
  userId: string,
  addressId: string,
) {
  const { error } = await supabaseAdmin
    .from("user_addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return addressId;
}

export async function clearDefaultAddressRepository(userId: string) {
  const { error } = await supabaseAdmin
    .from("user_addresses")
    .update({ is_default: false })
    .eq("user_id", userId)
    .eq("is_default", true);

  if (error) {
    throw new Error(error.message);
  }
}
