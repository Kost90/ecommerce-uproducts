import ProductDetailsWrapper from '@/components/productDetailsWrapper/ProductDetailsWrapper';
import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react';

async function productDetailsPage({ params: { productId } }: { params: { productId: string } }): Promise<JSX.Element> {
  return (
    <div className="my-16 md:my-32">
      <Suspense fallback={<Loader2 className="size-24 animate-spin" />}>
        <ProductDetailsWrapper productId={productId} />
      </Suspense>
    </div>
  );
}

export default productDetailsPage;
