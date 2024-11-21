import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '@/lib/createAppSlice';
// import { RootState } from "@/lib/store";

export interface IOrders {
  productId: string;
  pricePaidInCents: string;
  productName: string;
  amount: number;
  userId?: string;
}

export interface IOrdersState {
  ordersById: Record<string, IOrders>; // Хранение заказов по их productId
  userOrders: Record<string, string[]>; // Сопоставление userId -> массив productId
}

export const initialState: IOrdersState = {
  ordersById: {},
  userOrders: {},
};

export const orderSlice = createAppSlice({
  name: 'orders',
  initialState,
  reducers: (create) => ({
    initializeOrders: create.reducer((state, action: PayloadAction<IOrders[]>) => {
      action.payload.map((order) => {
        state.ordersById[order.productId] = order;
        if (!state.userOrders[order.userId!]) {
          state.userOrders[order.userId!] = [];
        }
        state.userOrders[order.userId!].push(order.productId);
      });
    }),
    addnewOrder: create.reducer((state, action: PayloadAction<IOrders>) => {
      const order = action.payload;
      if (order.userId) {
        if (!state.userOrders[order.userId!]) {
          state.userOrders[order.userId] = [];
        }
        state.userOrders[order.userId!].push(order.productId);
      }
    }),
    removeOrder: create.reducer((state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const order = state.ordersById[productId];
      if (order && order.userId) {
        state.userOrders[order.userId] = state.userOrders[order.userId].filter((id) => id !== productId);
      }
      delete state.ordersById[productId];
    }),
  }),
  selectors: {
    selectOrders: (orders) => orders,
  },
});

export const { initializeOrders, addnewOrder } = orderSlice.actions;

export const { selectOrders } = orderSlice.selectors;

export default orderSlice.reducer;
