import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { orderSlice } from "./features/orders/ordersSlice";

const rootReducers = combineSlices(orderSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducers,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
