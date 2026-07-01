export interface CheckoutItem {
  id: number;
  type: "SEVA" | "PRASAD" | "SHOP";

  title: string;
  temple: string;

  image: string;

  quantity: number;

  price: number;

  date?: string;

  extra?: string;
}

export interface DeliveryAddress {
  fullName: string;

  phone: string;

  address1: string;

  address2?: string;

  city: string;

  state: string;

  pincode: string;

  saveAddress: boolean;
}

export interface DeliveryMethod {
  id: string;

  name: string;

  duration: string;

  price: number;
}

export interface CheckoutProps {
  items: CheckoutItem[];
}
