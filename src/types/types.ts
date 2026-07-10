export type CartItemType = {
  id: string | number;
  type: "PRODUCT" | "SEVA" | "CLOTH" | "FRAME" | "YATRA" | "PRASAD" | "SHOP";
  title: string;
  price: number;
  quantity: number;
  image?: string;

  temple?: string;
  extra?: string;
  date?: string;

  slug?: string;
  selectedDate?: string;
  selectedSlot?: string;
  variant?: string;
};
