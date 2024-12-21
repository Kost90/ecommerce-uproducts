import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '@/lib/redux/createAppSlice';
import { IAdress } from '@/lib/helpers/helpers';
import { CartItem } from '../cart/types';

export interface ICostumerData {
  firstname: string;
  lastname: string;
  deliveryAdress: IAdress;
  phone: string;
  email: string;
}

export interface IOrders {
  orderNumber: string;
  items: Omit<CartItem, 'picture'>[];
  pricePaidInCents: string;
  userId?: string;
  costumerDetails: ICostumerData | object;
}

export interface IOrdersState {
  orders: Record<string, IOrders>;
  userOrders: Record<string, string[]>;
  userDetails: ICostumerData | object;
}

export const initialState: IOrdersState = {
  orders: {},
  userOrders: {},
  userDetails: {},
};

export const orderSlice = createAppSlice({
  name: 'orders',
  initialState,
  reducers: (create) => ({
    initializeOrders: create.reducer((state, action: PayloadAction<IOrders[]>) => {
      action.payload.forEach((order) => {
        state.orders[order.orderNumber] = order;
        if (order.userId) {
          if (!state.userOrders[order.userId!]) {
            state.userOrders[order.userId!] = [];
          }
          if (!state.userOrders[order.userId].includes(order.orderNumber)) {
            state.userOrders[order.userId].push(order.orderNumber);
          }
        }
      });
    }),
    addnewOrder: create.reducer((state, action: PayloadAction<IOrders>) => {
      const order = action.payload;
      if (!state.orders[order.orderNumber]) {
        state.orders[order.orderNumber] = order;
        if (order.userId) {
          if (!state.userOrders[order.userId!]) {
            state.userOrders[order.userId] = [];
          }
          if (!state.userOrders[order.userId].includes(order.orderNumber)) {
            state.userOrders[order.userId!].push(order.orderNumber);
          }
        }
      }
    }),
    removeOrder: create.reducer((state, action: PayloadAction<string>) => {
      const orderNumber = action.payload;
      const order = state.orders[orderNumber];
      if (order && state.userOrders[order.userId!]) {
        state.userOrders[order.userId!] = state.userOrders[order.userId!].filter((el) => el !== orderNumber);

        if (state.userOrders[order.userId!].length === 0) {
          delete state.userOrders[order.userId!];
        }
      }
      delete state.orders[orderNumber];
    }),
    // TODO:Think how to make it right and save to the userOrders
    setCustomerDetails: create.reducer((state, action: PayloadAction<ICostumerData>) => {
      const customerDetails = action.payload;
      if (customerDetails) {
        state.userDetails = {
          ...state.userDetails,
          ...customerDetails,
        };
      }
    }),
    clearCostumerDetails: (state): void => {
      state.userDetails = {};
    },
  }),
});

export const { initializeOrders, addnewOrder, removeOrder, setCustomerDetails, clearCostumerDetails } = orderSlice.actions;

export default orderSlice.reducer;
