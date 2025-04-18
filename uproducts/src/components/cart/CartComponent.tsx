import { useCallback } from 'react';
import { useAppSelector } from '@/hooks/hooks';
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
import { selectCartData } from '@/lib/redux/selectors/cartSelectors';
import { useDispatch } from 'react-redux';
import { removeItem, updateItem } from '@/lib/redux/reducers/cart/cartSlice';
import { AppDispatch } from '@/lib/redux/store';
import { CartItem } from '@/lib/redux/reducers/cart/types';
import CartAndOrderItem from '../cartAndOrderItem/CartAndOrderItem';
import TypographyH3 from '../typography/TyphographyH3';
import { Label } from '../ui/label';

function CartComponent(): JSX.Element {
  const { items, totalPrice } = useAppSelector(selectCartData);
  const numberOfCartItems = Object.keys(items).length;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-row justify-center items-center group">
          <ShoppingBasket className="text-slate-500 group-hover:text-primary" />
          <span className="font-medium text-slate-500 group-hover:text-primary">{numberOfCartItems}</span>
        </div>
      </SheetTrigger>
      <SheetDisplya cartItems={items} totalPrice={totalPrice} />
    </Sheet>
  );
}

function SheetDisplya({ cartItems, totalPrice }: { cartItems: Record<'string', CartItem>; totalPrice: number }): JSX.Element {
  const cartArray = Object.values(cartItems);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = useCallback(
    (actionType: string, productId: string, quantity?: number): void => {
      switch (actionType) {
        case 'update':
          dispatch(updateItem({ productId: productId, quantity: quantity! }));
          break;
        case 'remove':
          dispatch(removeItem(productId));
          break;
      }
    },
    [dispatch],
  );

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your items from cart and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>

      <div className="flex flex-col items-start gap-4 my-4 overflow-y-auto max-h-96">
        {cartArray.length !== 0 && (
          <Label htmlFor={`products`} className="text-right font-bold">
            Products:
          </Label>
        )}
        {cartArray.map((el, i) => (
          <CartAndOrderItem item={el} key={el.productId + i} onQuantityChange={handleClick} />
        ))}
      </div>

      <SheetFooter className="items-center">
        <TypographyH3 text={`Total price: ${totalPrice.toFixed(2)}$`} />
        <SheetClose asChild>
          {cartArray.length > 0 ? (
            <NavLink href="/checkout">
              <Button>Checkout</Button>
            </NavLink>
          ) : (
            <Button disabled>Checkout</Button>
          )}
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default CartComponent;
