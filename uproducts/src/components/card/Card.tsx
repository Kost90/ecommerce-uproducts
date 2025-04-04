'use client';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/redux/reducers/cart/cartSlice';
import { CartItem } from '@/lib/redux/reducers/cart/types';
import { AppDispatch } from '@/lib/redux/store';
import { useCallback } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { setFirstLetterUppercase } from '@/helpers/helpers';

interface IProps {
  id: string;
  name: string;
  price: string;
  picture: string;
  description: string;
  className?: string;
  imageHeigth?: string;
}

function CardComponent({ ...props }: IProps): JSX.Element {
  const { toast } = useToast();
  const { name, price, picture, description, className, imageHeigth, id } = props;
  const dispatch = useDispatch<AppDispatch>();
  const handelAddItem = useCallback(
    (item: CartItem): void => {
      dispatch(addItem(item));
    },
    [dispatch],
  );

  return (
    <Card className={`cursor-pointer w-full h-full flex flex-col items-start justify-around p-2 ${className}`}>
      <CardHeader>
        <CardTitle className="capitalize text-base">{name}</CardTitle>
      </CardHeader>
      <CardContent className={`flex flex-col ${imageHeigth}`}>
        <div className={`relative w-full h-[200px] md:h-[200px] lg:h-[400px] overflow-hidden rounded-md`}>
          <Image
            src={picture}
            alt={`picture_of_${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 
             (max-width: 1200px) 75vw, 
             50vw"
          />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex gap-4 justify-between w-full">
        <div className="flex items-center gap-3">
          <CardTitle className="text-foreground">{price}</CardTitle>
          <Button className="rounded-lg h-8">
            <Link href={`productdetails/${id}`}>Buy</Link>
          </Button>
        </div>
        <Button
          className="bg-inherit hover:bg-inherit"
          type="button"
          onClick={() => {
            toast({
              title: setFirstLetterUppercase(name),
              description: 'Added to the basket',
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
          <ShoppingCart className="text-orange hover:text-slate-500" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;
