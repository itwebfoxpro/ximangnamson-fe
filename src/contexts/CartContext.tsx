"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

const STORAGE_KEY = "ximangnamson_cart_v1";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  items: CartItem[];
  subtotal: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  // toast
  toastMessage: string | null;
  clearToast: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({ items: [] });
  const [initialized, setInitialized] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed && Array.isArray(parsed.items)) {
          // ensure ids are numbers (in case they were saved as strings)
          const normalized = {
            items: parsed.items.map((it) => ({
              ...it,
              id: typeof it.id === "string" ? Number(it.id) : it.id,
            })),
          };
          setCart(normalized);
        }
      }
    } catch (err) {
      console.error("Error loading cart from localStorage", err);
    } finally {
      setInitialized(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!initialized) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error("Error saving cart to localStorage", err);
    }
  }, [cart, initialized]);

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const addItem = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.items.find((i) => i.id === item.id);
      if (existing) {
        showToast(`Đã cập nhật số lượng "${item.name}" trong giỏ hàng`);
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }

      showToast(`Đã thêm "${item.name}" vào giỏ hàng`);
      return { ...prev, items: [...prev.items, item] };
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return {
          ...prev,
          items: prev.items.filter((i) => i.id !== id),
        };
      }

      return {
        ...prev,
        items: prev.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
      };
    });
  };

  const removeItem = (id: number) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== id),
    }));
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  const value: CartContextValue = {
    items: cart.items,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    toastMessage,
    clearToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
