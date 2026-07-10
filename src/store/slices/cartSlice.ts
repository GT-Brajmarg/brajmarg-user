// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type CartItemType = "PRODUCT" | "SEVA" | "CLOTH" | "FRAME" | "YATRA";

// export interface CartItem {
//   id: string;
//   type: CartItemType;
//   title: string;
//   price: number;
//   quantity: number;
//   image?: string;
//   slug?: string;

//   // Optional metadata for different item categories
//   templeName?: string;
//   selectedDate?: string;
//   selectedSlot?: string;
//   variant?: string;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const incomingItem = action.payload;

//       const existingItem = state.items.find(
//         (item) =>
//           item.id === incomingItem.id &&
//           item.type === incomingItem.type &&
//           item.selectedDate === incomingItem.selectedDate &&
//           item.selectedSlot === incomingItem.selectedSlot &&
//           item.variant === incomingItem.variant,
//       );

//       if (existingItem) {
//         existingItem.quantity += incomingItem.quantity || 1;
//       } else {
//         state.items.push({
//           ...incomingItem,
//           quantity: incomingItem.quantity || 1,
//         });
//       }
//     },

//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },

//     updateQuantity: (
//       state,
//       action: PayloadAction<{ id: string; quantity: number }>,
//     ) => {
//       const item = state.items.find(
//         (cartItem) => cartItem.id === action.payload.id,
//       );

//       if (!item) return;

//       if (action.payload.quantity <= 0) {
//         state.items = state.items.filter(
//           (cartItem) => cartItem.id !== action.payload.id,
//         );
//         return;
//       }

//       item.quantity = action.payload.quantity;
//     },

//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } =
//   cartSlice.actions;

// export default cartSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "@/types/types";

interface CartState {
  items: CartItemType[];
  appliedCoupon: string | null;
}

const initialState: CartState = {
  items: [],
  appliedCoupon: null,
};

type CartItemKey = {
  id: string | number;
  selectedDate?: string;
  selectedSlot?: string;
  variant?: string;
};

const isSameCartItem = (item: CartItemType, key: CartItemKey) =>
  item.id === key.id &&
  item.selectedDate === key.selectedDate &&
  item.selectedSlot === key.selectedSlot &&
  item.variant === key.variant;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      //   console.log("CART REDUCER HIT:", action.payload);
      const incomingItem = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.id === incomingItem.id &&
          item.type === incomingItem.type &&
          item.selectedDate === incomingItem.selectedDate &&
          item.selectedSlot === incomingItem.selectedSlot &&
          item.variant === incomingItem.variant,
      );

      if (existingItem) {
        existingItem.quantity += incomingItem.quantity || 1;
      } else {
        state.items.push({
          ...incomingItem,
          quantity: incomingItem.quantity || 1,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<CartItemKey>) => {
      state.items = state.items.filter(
        (item) => !isSameCartItem(item, action.payload),
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<CartItemKey & { quantity: number }>,
    ) => {
      const item = state.items.find((cartItem) =>
        isSameCartItem(cartItem, action.payload),
      );

      if (!item) return;

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => !isSameCartItem(cartItem, action.payload),
        );
        return;
      }

      item.quantity = action.payload.quantity;
    },

    clearCart: (state) => {
      state.items = [];
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.appliedCoupon = action.payload;
    },

    removeCoupon: (state) => {
      state.appliedCoupon = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
