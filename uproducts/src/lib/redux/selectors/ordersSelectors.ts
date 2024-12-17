import { RootState } from '@/lib/redux/store';
import { ICostumerData, IOrders } from '../reducers/orders/ordersSlice';

export const selectUserOrders = (state: RootState, userId: string): string[][] => {
  const userOrdersIds = state.orders.userOrders[userId] || [];
  // TODO: Think to change
  return userOrdersIds.map((id) => state.orders.userOrders[id]);
};

export const selectOrderByProductId = (state: RootState, orderNumber: string): IOrders => {
  return state.orders.orders[orderNumber];
};

export const selectCostumerDetails = (state: RootState): Partial<ICostumerData> => {
  return state.orders.userDetails;
};
