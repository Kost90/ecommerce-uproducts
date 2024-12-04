import { RootState } from '@/lib/redux/store';

export const selectUserOrders = (state: RootState, userId: string) => {
  const userOrdersIds = state.orders.userOrders[userId] || [];
  return userOrdersIds.map((id) => state.orders.userOrders[id]);
};

export const selectOrderByProductId = (state: RootState, orderNumber: string) => {
  return state.orders.orders[orderNumber];
};

export const selectCostumerDetails = (state:RootState) => {
  return state.orders.userDetails
}
