'use client';
import { useRef } from 'react';
import { useAppSelector, useAppStore } from '@/lib/hooks';
import { NavLink } from '@/components/NavLink/Nav';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { selectCartItems } from '@/lib/features/selectors/cartSelectors';

function CartComponent() {

  // const store = useAppStore();
  // const initialized = useRef(false);
  // if (!initialized.current) {
  //   store.dispatch(initializeOrders(product))
  //   initialized.current = true
  // }
  const cartItems = useAppSelector(selectCartItems);
  console.log(cartItems);
  const numberOfCartItems = Object.keys(cartItems).length;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-row justify-center items-center group">
          <ShoppingBasket className="text-slate-500 group-hover:text-primary" />
          <span className="font-medium text-slate-500 group-hover:text-primary">{numberOfCartItems}</span>
        </div>
      </SheetTrigger>
      <SheetDisplya />
    </Sheet>
  );
}

// ! Передаю сюда пропсами данные из редакс стора о заказе или заказах.
function SheetDisplya() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>

      {/* Сюда добавляю тело щита - все о товарах которые в корзине */}

      <SheetFooter>
        <SheetClose asChild>
          <NavLink href="/cart">
            <Button>Checkout</Button>
          </NavLink>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default CartComponent;
