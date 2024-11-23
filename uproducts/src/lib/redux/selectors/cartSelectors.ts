import { RootState } from '@/lib/redux/store';

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

export const selectCartData = (state: RootState) => {
  const items = state.cart.items;
  const totalQuantity = state.cart.totalQuantity;
  const totalPrice = state.cart.totalPriceInCents;

  return { items, totalQuantity, totalPrice };
};
