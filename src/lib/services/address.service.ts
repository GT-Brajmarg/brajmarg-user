import type { AddressPayload } from "@/types/address.types";
import {
  clearDefaultAddressRepository,
  createUserAddressRepository,
  deleteUserAddressRepository,
  getUserAddressesRepository,
  updateUserAddressRepository,
} from "@/lib/repositories/address.repository";

function validateAddress(payload: AddressPayload) {
  if (!payload.fullName.trim()) {
    throw new Error("Full name is required.");
  }

  if (!/^\d{10}$/.test(payload.mobile)) {
    throw new Error("Enter a valid 10-digit mobile number.");
  }

  if (!payload.addressLine1.trim()) {
    throw new Error("Address line 1 is required.");
  }

  if (!payload.city.trim()) {
    throw new Error("City is required.");
  }

  if (!payload.state.trim()) {
    throw new Error("State is required.");
  }

  if (!/^\d{6}$/.test(payload.pincode)) {
    throw new Error("Enter a valid 6-digit pincode.");
  }
}

export async function getUserAddressesService(userId: string) {
  return getUserAddressesRepository(userId);
}

export async function createUserAddressService(
  userId: string,
  payload: AddressPayload,
) {
  validateAddress(payload);

  const existingAddresses = await getUserAddressesRepository(userId);

  const shouldBeDefault =
    payload.isDefault === true || existingAddresses.length === 0;

  if (shouldBeDefault) {
    await clearDefaultAddressRepository(userId);
  }

  return createUserAddressRepository(userId, {
    ...payload,
    isDefault: shouldBeDefault,
  });
}

export async function updateUserAddressService(
  userId: string,
  addressId: string,
  payload: AddressPayload,
) {
  validateAddress(payload);

  if (payload.isDefault) {
    await clearDefaultAddressRepository(userId);
  }

  return updateUserAddressRepository(userId, addressId, payload);
}

export async function deleteUserAddressService(
  userId: string,
  addressId: string,
) {
  return deleteUserAddressRepository(userId, addressId);
}
