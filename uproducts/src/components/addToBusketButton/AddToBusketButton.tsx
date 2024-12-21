'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/redux/reducers/cart/cartSlice';
import { CartItem } from '@/lib/redux/reducers/cart/types';
import { AppDispatch } from '@/lib/redux/store';
import { useCallback } from 'react';
import { Button } from '../ui/button';
import { TypographyP } from '../typography/TypographyP';
import { useToast } from '@/hooks/use-toast';
import { setFirstLetterUppercase } from '@/lib/helpers/helpers';

interface IProps {
  id: string;
  name: string;
  price: string;
  picture: string;
  description?: string;
}

function AddToBusketButton({ ...props }: IProps): React.JSX.Element {
  const { toast } = useToast();
  const { name, price, picture, id } = props;
  const dispatch = useDispatch<AppDispatch>();
  const handelAddItem = useCallback(
    (item: CartItem): void => {
      dispatch(addItem(item));
    },
    [dispatch],
  );
  return (
    <Button
      type="button"
      onClick={() => {
        toast({
          title: setFirstLetterUppercase(name),
          description: 'Added to basket',
        });
        handelAddItem({
          productId: id,
          productName: name,
          priceInCents: Number(price.replace(/[$,]/g, '')),
          quantity: 1,
          picture: picture,
        });
      }}
    >
      <TypographyP text="add to cart" />
    </Button>
  );
}

export default AddToBusketButton;
