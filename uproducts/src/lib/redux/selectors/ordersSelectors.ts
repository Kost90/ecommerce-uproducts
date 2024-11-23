import { RootState } from '@/lib/redux/store';

export const selectUserOrders = (state: RootState, userId: string) => {
  const userOrdersIds = state.orders.userOrders[userId] || [];
  return userOrdersIds.map((id) => state.orders.ordersById[id]);
};

export const selectOrderByProductId = (state: RootState, productId: string) => {
  return state.orders.ordersById[productId];
};
