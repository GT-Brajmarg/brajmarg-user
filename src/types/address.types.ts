export type AddressLabel = "Home" | "Office" | "Other";

export type Address = {
  id: string;
  userId: string;
  label: AddressLabel;
  fullName: string;
  mobile: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AddressPayload = {
  label: AddressLabel;
  fullName: string;
  mobile: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
};

export type AddressApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};
