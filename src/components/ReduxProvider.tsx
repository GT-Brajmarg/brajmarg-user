"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { hydrateCart } from "@/store/slices/cartSlice";

function CartHydrator() {
  useEffect(() => {
    const savedCart = localStorage.getItem("brajmarg_cart");

    if (savedCart) {
      try {
        store.dispatch(hydrateCart(JSON.parse(savedCart)));
      } catch (err) {
        console.error("Failed to restore cart", err);
      }
    }
  }, []);

  return null;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <CartHydrator />
      {children}
    </Provider>
  );
}
