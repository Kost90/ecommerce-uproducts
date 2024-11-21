import { configureStore, combineSlices, Middleware, combineReducers } from '@reduxjs/toolkit';
import { orderSlice } from '@/lib/features/orders/ordersSlice';
import { cartSlice } from '@/lib/features/cart/cartSlice';
import { PayloadAction } from '@reduxjs/toolkit';

// TODO:Think how make preload
const cartMidleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);
  if (action.type.startsWith('cart/')) {
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }
  return result;
};

const rootReducers = combineReducers({ orders: orderSlice.reducer, cart: cartSlice.reducer });

export const makeStore = () => {
  return configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMidleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
