/**
 * Provider-agnostic shipping contract.
 *
 * Everything in the app talks to this interface, never to a concrete
 * provider. Shiprocket is the only implementation today; adding
 * Delhivery (or a hyperlocal provider) later means writing one more
 * adapter that satisfies this interface — no caller changes.
 */

export type PaymentType = "Prepaid" | "COD";

/** One courier option returned by a serviceability/rate check. */
export type CourierOption = {
  courierName: string;
  courierId: number | string;
  rate: number; // INR
  cod: boolean; // does this courier support COD for the route?
  estimatedDeliveryDays?: string;
  etd?: string; // human-readable ETA, e.g. "3-4 days"
};

export type ServiceabilityQuery = {
  pickupPincode: string;
  deliveryPincode: string;
  cod: boolean;
  weight: number; // kg
};

/** A single line item as the courier needs it (snapshot from order_items). */
export type ShipmentItem = {
  name: string;
  sku: string;
  units: number;
  sellingPrice: number;
};

export type CreateShipmentInput = {
  orderNumber: string; // your BRJ-xxxx (provider "order_id")
  pickupTag: string; // which registered pickup location ships this
  paymentType: PaymentType;
  subTotal: number;
  codAmount: number; // 0 for Prepaid
  customer: {
    name: string;
    phone: string;
    email?: string | null;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    pincode: string;
  };
  items: ShipmentItem[];
  // Parcel dimensions (cm) + weight (kg). Defaults applied by the adapter
  // if a SKU has no stored dimensions.
  weight?: number;
  length?: number;
  breadth?: number;
  height?: number;
  // Optional: pin AWB assignment to a specific courier (e.g. the
  // cheapest-serviceable one from checkServiceability). When omitted,
  // the provider auto-selects its recommended courier.
  courierId?: number | string;
};

export type ShipmentResult = {
  provider: string;
  srOrderId: string | null;
  shipmentId: string | null;
  awbCode: string | null;
  courierName: string | null;
  trackingUrl: string | null;
  deliveryPin: string | null;
  estimatedDelivery: string | null; // ISO date or null
};

export type TrackResult = {
  awb: string;
  status: string; // raw provider status
  scans: { date: string; activity: string; location?: string }[];
};

export interface ShippingProvider {
  readonly name: string;
  checkServiceability(q: ServiceabilityQuery): Promise<CourierOption[]>;
  createShipment(input: CreateShipmentInput): Promise<ShipmentResult>;
  cancelShipment(awbOrShipmentId: string): Promise<void>;
  track(awb: string): Promise<TrackResult>;
}
