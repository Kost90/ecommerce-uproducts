import { configureStore, Middleware, combineReducers } from '@reduxjs/toolkit';
import { orderSlice } from '@/lib/redux/reducers/orders/ordersSlice';
import { cartSlice } from '@/lib/redux/reducers/cart/cartSlice';
import { modalSlice } from './reducers/modal/modalSlice';

const cartMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);

  if (action.type.startsWith('cart/')) {
    const state = store.getState();

    const expireInMs = 3 * 60 * 60 * 1000;
    const expireDate = Date.now() + expireInMs;

    const cartData = {
      data: state.cart,
      expireAt: expireDate,
    };

    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  return result;
};

const loadCartFromLocalStorage = (): any => {
  const cartItem = localStorage.getItem('cart');

  if (!cartItem) return null;

  const { data, expireAt } = JSON.parse(cartItem);

  if (Date.now() > expireAt) {
    localStorage.removeItem('cart');
    return null;
  }

  return data;
};

const rootReducers = combineReducers({ orders: orderSlice.reducer, cart: cartSlice.reducer, modal: modalSlice.reducer });

export const makeStore = () => {
  const preloadedCart = loadCartFromLocalStorage();

  return configureStore({
    reducer: rootReducers,
    preloadedState: {
      cart: preloadedCart || undefined,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
