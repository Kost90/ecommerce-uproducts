import React from 'react';
import { Product } from '@/constans/typeconstans';
import ProductsApi from '@/api/services/productsServices/ProductsApi';
import ProductDetailItem from '../productsDetailItem/ProductDetailItem';

async function ProductDetailsWrapper({ productId }: { productId: string }): Promise<React.JSX.Element> {
  const product: Product = await ProductsApi.getSingleProduct(productId);

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <ProductDetailItem product={product} />
    </div>
  );
}

export default ProductDetailsWrapper;
