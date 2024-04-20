"use client";
import { useRef } from "react";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { NavLink } from "@/components/Nav";
import { ShoppingBasket } from "lucide-react";
import { selectOrders } from "@/lib/features/orders/ordersSlice";

function CartComponent() {
  // TODO:Import state from redux store - about count of orders.
  const store = useAppStore();
  const initialized = useRef(false);
  // if (!initialized.current) {
  //   store.dispatch(initializeOrders(product))
  //   initialized.current = true
  // }
  const orders = useAppSelector(selectOrders);

  return (
    <div className="flex flex-row justify-center items-center group">
      <NavLink href="/cart">
        <ShoppingBasket />
      </NavLink>
      <span className="font-medium text-slate-500 group-hover:text-primary">
        {orders.length}
      </span>
    </div>
  );
}

export default CartComponent;
