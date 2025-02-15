import React from 'react';
import TypographyH1 from '../typography/TypographyH1';
import Image from 'next/image';
import { setFirstLetterUppercase } from '@/helpers/helpers';
import { TypographyLead } from '../typography/TypographyLead';
import { formatCurrency } from '@/helpers/formatter';
import { TypographyLarge } from '../typography/TypographyLarge';
import AddToBusketButton from '../addToBusketButton/AddToBusketButton';
import { Product } from '@/types/productTypes';

function ProductDetailItem({ product }: { product: Product }): React.JSX.Element {
  return (
    <div className="flex flex-col gap-10 items-start justify-start relative h-full md:w-1/2 lg:w-1/3">
      <TypographyH1 text={setFirstLetterUppercase(product.name)} />
      <div className="relative w-full h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-md">
        <Image
          src={product.imagePath as string}
          alt={`${product.imageKey} alt`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 
             (max-width: 1200px) 75vw, 
             50vw"
        />
      </div>
      <TypographyLead text={product.description} />
      <div className="flex justify-between items-center w-full">
        <TypographyLarge text={formatCurrency(product.priceInCents / 100)} />
        <AddToBusketButton
          id={product.id!}
          name={product.name}
          price={formatCurrency(product.priceInCents / 100)}
          picture={product.imagePath as string}
          description={product.description}
        />
      </div>
    </div>
  );
}

export default ProductDetailItem;
