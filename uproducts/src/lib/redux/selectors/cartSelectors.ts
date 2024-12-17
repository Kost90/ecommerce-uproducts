import { RootState } from '@/lib/redux/store';
import { CartItem, CartState } from '../reducers/cart/types';

export const selectCartItems = (state: RootState): Record<string, CartItem> => {
  return state.cart.items;
};

export const selectCartQuantity = (state: RootState): number => state.cart.totalQuantity;

export const selectCartTotalPrice = (state: RootState): number => state.cart.totalPrice;

export const selectCartItemById = (state: RootState, productId: string): CartItem | undefined => {
  const item = state.cart.items[productId];
  if (item) {
    return item;
  }
};

export const selectCartData = (state: RootState): CartState => {
  const items = state.cart.items;
  const totalQuantity = state.cart.totalQuantity;
  const totalPrice = state.cart.totalPrice;

  return { items, totalQuantity, totalPrice };
};
