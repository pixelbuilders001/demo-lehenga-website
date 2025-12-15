import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          if (state.items.find((p) => p.id === product.id)) {
            return state;
          }
          return { items: [...state.items, product] };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        }));
      },
      
      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "vanya-wishlist",
    }
  )
);
