export interface CartItemType {
  id: number;
  type: "SEVA" | "PRASAD" | "SHOP";
  title: string;
  temple: string;
  extra?: string;
  date?: string;
  price: number;
  quantity: number;
  image: string;
}
