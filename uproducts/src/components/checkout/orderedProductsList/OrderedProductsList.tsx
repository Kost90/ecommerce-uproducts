import React, { useCallback } from 'react';
import { CartState } from '@/lib/redux/reducers/cart/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { removeItem, updateItem } from '@/lib/redux/reducers/cart/cartSlice';
import CartAndOrderItem from '@/components/cartAndOrderItem/CartAndOrderItem';
import TypographyH4 from '@/components/typography/TypographyH4';

interface IOrderedProductListProps {
  cartDataProp: CartState;
}

function OrderedProductsList({ cartDataProp }: IOrderedProductListProps): React.JSX.Element {
  const cartArray = Object.values(cartDataProp.items);
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
    <div className="flex flex-col gap-5">
      <TypographyH4 text={'Ordered products:'} />
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 w-full flex-grow">
        {cartArray.map((item, i) => (
          <CartAndOrderItem
            item={item}
            onQuantityChange={handleClick}
            key={`${item.productId} + ${i}`}
            containerStyles={'border border-slate-400 p-2 rounded-sm'}
          />
        ))}
      </div>
      <TypographyH4 text={`Total price: ${cartDataProp.totalPrice}$`} />
    </div>
  );
}

export default OrderedProductsList;
