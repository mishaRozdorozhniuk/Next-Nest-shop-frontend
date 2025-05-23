import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  imageExists?: boolean;
  imageExtension?: string;
}

interface CartStoreState {
  products: CartProductItem[];
  addProductToCart: (product: CartProductItem) => void;
  removeProductFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      products: [],
      addProductToCart: (product: CartProductItem) => {
        const exists = get().products.some(p => p.id === product.id);
        if (exists) return;

        set(state => ({
          products: [...state.products, product],
        }));
      },
      removeProductFromCart: (productId: number) => {
        set(state => ({
          products: state.products.filter(product => product.id !== productId),
        }));
      },
      clearCart: () => {
        set(() => ({
          products: [],
        }));
      },
      getTotalPrice: () => {
        const price = get().products.reduce((acc, el) => acc + el.price, 0);
        return price;
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
);
