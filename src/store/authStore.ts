import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  addresses: Address[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<boolean>;
  logout: () => void;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      addresses: [],
      
      login: async (email, password) => {
        // Simulated login - in production, this would call an API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        if (email && password) {
          set({
            user: {
              id: "1",
              email,
              firstName: "Priya",
              lastName: "Sharma",
            },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      
      signup: async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        set({
          user: {
            id: "1",
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          },
          isAuthenticated: true,
        });
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      addAddress: (address) => {
        const newAddress = { ...address, id: Date.now().toString() };
        set((state) => ({
          addresses: [...state.addresses, newAddress],
        }));
      },
      
      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        }));
      },
      
      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
      },
    }),
    {
      name: "vanya-auth",
    }
  )
);
