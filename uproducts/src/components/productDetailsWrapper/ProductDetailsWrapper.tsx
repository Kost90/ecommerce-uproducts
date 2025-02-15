import React from 'react';
import ProductsApi from '@/api/services/productsServices/ProductsApi';
import ProductDetailItem from '../productsDetailItem/ProductDetailItem';
import { IResponse } from '@/types/typeconstans';
import { Product } from '@/types/productTypes';
import { TypographyLead } from '../typography/TypographyLead';

async function ProductDetailsWrapper({ productId }: { productId: string }): Promise<React.JSX.Element> {
  const response: IResponse<Product> = await ProductsApi.getSingleProduct(productId);

  if (response.error) {
    console.error(response.error.message);
    return <TypographyLead text="Server error, try to refresh page." />;
  }

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <ProductDetailItem product={response.data!} />
    </div>
  );
}

export default ProductDetailsWrapper;
