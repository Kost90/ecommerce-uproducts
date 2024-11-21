import { RootState } from '@/lib/store';

export const selectCartItems = (state: RootState) => {
  return state.cart.items;
};

export const selectCartQuantity = (state: RootState) => state.cart.totalQuantity;

export const selectCartTotalPrice = (state: RootState) => state.cart.totalPriceInCents;

export const selectCartItemById = (state: RootState, productId: string) => {
  const item = state.cart.items[productId];
  if (item) {
    return item;
  }
};
