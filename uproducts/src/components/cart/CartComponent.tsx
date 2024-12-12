'use client';
import { useCallback, useEffect } from 'react';
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
import { replaceCart, addItem, removeItem, updateItem } from '@/lib/redux/reducers/cart/cartSlice';
import { AppDispatch } from '@/lib/redux/store';
import { CartItem, CartState } from '@/lib/redux/reducers/cart/types';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

function CartComponent(): JSX.Element {
  const { items, totalPrice } = useAppSelector(selectCartData);
  const numberOfCartItems = Object.keys(items).length;

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (typeof window !== undefined) {
      try {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          const cartParsedData: CartState = JSON.parse(cartData);
          dispatch(replaceCart(cartParsedData));
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, [dispatch]);

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

  const handleClick = useCallback((actionType: string, productId: string, quantity?: number): void => {
    switch (actionType) {
      case 'update':
        dispatch(updateItem({ productId: productId, quantity: quantity! }));
        break;
      case 'remove':
        dispatch(removeItem(productId));
        break;
    }
  }, []);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>

      <div className="flex flex-col items-start gap-4 my-4 overflow-y-auto max-h-96">
        {cartArray.map((el, i) => (
          <CartItemDetails item={el} key={el.productId + i} onQuantityChange={handleClick} />
        ))}
      </div>

      <SheetFooter className="items-center">
        <h3 className="text-left">Total price: {totalPrice.toFixed(2)}$</h3>
        <SheetClose asChild>
          <NavLink href="/checkout">
            <Button>Checkout</Button>
          </NavLink>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

function CartItemDetails({
  item,
  onQuantityChange,
}: {
  item: CartItem;
  onQuantityChange: (actionType: string, productId: string, quantity?: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <Label htmlFor={`productName-${item.productId}`} className="text-right font-bold">
        Product:
      </Label>
      <p className="text-sm text-gray-700">{item.productName}</p>
      <div className="w-40 relative h-40">
        <Image
          src={item.picture}
          alt={`picture_of_${item.productName}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw"
        />
      </div>
      <p className="text-sm text-gray-700">
        Price: <span className="text-black">{item.priceInCents}$</span>
      </p>
      <div>
        <p className="text-sm text-gray-700">
          Quantity:{' '}
          <button onClick={() => onQuantityChange('update', item.productId, item.quantity - 1)} className="hover:text-black text-base">
            -
          </button>{' '}
          {item.quantity}{' '}
          <button onClick={() => onQuantityChange('update', item.productId, item.quantity + 1)} className="hover:text-black text-base">
            +
          </button>
        </p>
      </div>
    </div>
  );
}

export default CartComponent;
