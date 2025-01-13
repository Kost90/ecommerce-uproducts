import React from 'react';
import { IProductResponse } from '@/constans/typeconstans';
import ProductsApi from '@/api/services/productsServices/ProductsApi';
import ProductDetailItem from '../productsDetailItem/ProductDetailItem';

async function ProductDetailsWrapper({ productId }: { productId: string }): Promise<React.JSX.Element> {
  const response: IProductResponse = await ProductsApi.getSingleProduct(productId);
  // TODO: add error handler

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <ProductDetailItem product={response.data} />
    </div>
  );
}

export default ProductDetailsWrapper;
