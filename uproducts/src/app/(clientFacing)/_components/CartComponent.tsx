import { NavLink } from "@/components/Nav";
import { ShoppingBasket } from "lucide-react";

function CartComponent() {
  // TODO:Import state from redux store - about count of orders.

  return (
    <div className="flex flex-row justify-center items-center group">
      <NavLink href="/cart">
        <ShoppingBasket />
      </NavLink>
      <span className="font-medium text-slate-500 group-hover:text-primary">
        0
      </span>
    </div>
  );
}

export default CartComponent;
