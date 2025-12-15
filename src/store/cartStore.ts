import { Product } from "@/data/products";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
          );
          
          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += item.quantity;
            return { items: newItems };
          }
          
          return { items: [...state.items, item] };
        });
      },
      
      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.size === size && i.color === color)
          ),
        }));
      },
      
      updateQuantity: (productId, size, color, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId && i.size === size && i.color === color
              ? { ...i, quantity }
              : i
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "vanya-cart",
    }
  )
);
