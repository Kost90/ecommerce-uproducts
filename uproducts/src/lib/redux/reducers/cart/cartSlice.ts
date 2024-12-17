'use client';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '@/lib/redux/createAppSlice';
import { CartItem, CartState } from './types';

export const initialState: CartState = {
  items: {},
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: (create) => ({
    addItem: create.reducer((state, action: PayloadAction<CartItem>) => {
      const { productId, productName, priceInCents, quantity = 1, picture } = action.payload;
      if (state.items[productId]) {
        state.items[productId].quantity += quantity;
      } else {
        state.items[productId] = { productId, productName, priceInCents, quantity, picture };
      }
      state.totalQuantity += quantity;
      state.totalPrice += priceInCents * quantity;
    }),
    removeItem: create.reducer((state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.items[productId];
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.priceInCents * item.quantity;
        delete state.items[productId];
      }
    }),
    updateItem: create.reducer((state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;

      const item = state.items[productId];

      if (item) {
        const diference = quantity - item.quantity;
        state.totalQuantity += diference;
        state.totalPrice += diference * item.priceInCents;
        item.quantity = quantity;

        if (item.quantity <= 0) {
          delete state.items[productId];
        }
      }
    }),
    clearCart: (state): void => {
      state.items = {};
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
    replaceCart: create.reducer((state, action: PayloadAction<CartState>) => {
      const { items, totalPrice, totalQuantity } = action.payload;

      if (items && totalPrice >= 0 && totalQuantity >= 0) {
        state.items = items;
        state.totalPrice = totalPrice;
        state.totalQuantity = totalQuantity;
      } else {
        console.error('Invalid cart data received in replaceCart action.');
      }
    }),
  }),
});

export const { addItem, removeItem, updateItem, clearCart, replaceCart } = cartSlice.actions;

export default cartSlice.reducer;
