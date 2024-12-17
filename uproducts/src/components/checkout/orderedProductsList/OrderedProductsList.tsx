import React, { useCallback } from 'react';
import { CartState } from '@/lib/redux/reducers/cart/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { removeItem, updateItem } from '@/lib/redux/reducers/cart/cartSlice';
import CartItemDetails from '@/components/cart/CartItemDetails';

interface IOrderedProductListProps {
  cartDataProp: CartState;
}

function OrderedProductsList({ cartDataProp }: IOrderedProductListProps): React.JSX.Element {
  const cartArray = Object.values(cartDataProp.items);

  console.log(cartArray);
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
    <div>
      {cartArray.map((item, i) => (
        <CartItemDetails item={item} onQuantityChange={handleClick} key={`${item.productId} + ${i}`} />
      ))}
    </div>
  );
}

export default OrderedProductsList;
