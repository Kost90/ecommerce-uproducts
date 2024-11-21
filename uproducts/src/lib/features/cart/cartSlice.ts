import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '@/lib/createAppSlice';
import { CartItem, CartState } from './types';

export const initialState: CartState = {
  items: {},
  totalQuantity: 0,
  totalPriceInCents: 0,
};

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: (create) => ({
    addItem: create.reducer((state, action: PayloadAction<CartItem>) => {
      const { productId, productName, priceInCents, quantity = 1 } = action.payload;
      if (state.items[productId]) {
        state.items[productId].quantity += quantity;
      } else {
        state.items[productId] = { productId, productName, priceInCents, quantity };
      }
      state.totalQuantity += quantity;
      state.totalPriceInCents += priceInCents * quantity;
    }),
    removeItem: create.reducer((state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.items[productId];
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPriceInCents -= item.priceInCents * item.quantity;
        delete state.items[productId];
      }
    }),
    updateItem: create.reducer((state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;

      const item = state.items[productId];

      if (item) {
        const diference = quantity - item.quantity;
        state.totalQuantity += diference;
        state.totalPriceInCents += diference * item.priceInCents;
        item.quantity = quantity;

        if (item.quantity <= 0) {
          delete state.items[productId];
        }
      }
    }),
    clearCart: (state) => {
      state.items = {};
      state.totalPriceInCents = 0;
      state.totalQuantity = 0;
    },
  }),
});

export const { addItem, removeItem, updateItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
