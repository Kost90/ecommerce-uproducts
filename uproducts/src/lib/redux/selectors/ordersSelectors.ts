import { RootState } from '@/lib/redux/store';
import { ICostumerData, IOrders, IOrdersState } from '../reducers/orders/ordersSlice';

export const selectUserOrders = (state: RootState, userId: string): string[][] => {
  const userOrdersIds = state.orders.userOrders[userId] || [];
  // TODO: Think to change
  return userOrdersIds.map((id) => state.orders.userOrders[id]);
};

export const selectOrderByOrderNumber = (state: RootState, orderNumber: string): IOrders => {
  return state.orders.orders[orderNumber];
};

export const selectCostumerDetails = (state: RootState): ICostumerData | object => {
  return state.orders.userDetails;
};

export const selectOrders = (state: RootState): IOrdersState => {
  return state.orders;
};
