import { CartItem } from '@/lib/redux/reducers/cart/types';
import { Label } from '../ui/label';
import { TypographyP } from '../typography/TypographyP';
import Image from 'next/image';
import { setFirstLetterUppercase } from '@/lib/helpers/helpers';

function CartItemDetails({
  item,
  onQuantityChange,
}: {
  item: CartItem;
  onQuantityChange: (actionType: string, productId: string, quantity?: number) => void;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-2 items-start">
      <Label htmlFor={`productName-${item.productId}`} className="text-right font-bold">
        Product:
      </Label>
      <TypographyP text={setFirstLetterUppercase(item.productName)} />
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

export default CartItemDetails;
