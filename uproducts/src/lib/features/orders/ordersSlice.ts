import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/createAppSlice";
// import { RootState } from "@/lib/store";

// TODO: думаю об интерфейсе. как добавлять в заказы по два продукты, если покупатель указал купить 2 или более. Наверно высчитывается общая стоимость заказа, а продукты складываются в массив?
export interface IOrders {
  productId: string;
  pricePaidInCents: string;
  productName: string;
  amount: number;
  userId?: string;
}

export const initialState: IOrders[] = [];

export const orderSlice = createAppSlice({
  name: "orders",
  initialState,
  reducers: (create) => ({
    initializeOrders: create.reducer(
      (state, action: PayloadAction<IOrders>) => {
        return { ...state, ...action.payload };
      }
    ),
    addnewOrder: create.reducer((state, action: PayloadAction<IOrders>) => {
      state.push(action.payload);
    }),
  }),
  selectors: {
    selectOrders: (orders) => orders,
  },
});

export const { initializeOrders, addnewOrder } = orderSlice.actions;

export const { selectOrders } = orderSlice.selectors;

export default orderSlice.reducer;
