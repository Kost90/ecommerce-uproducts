import React from 'react';
import CheckoutWrapper from '@/components/checkout/checkoutWrapper/CheckoutWrapper';
import { Suspense } from 'react';
import AdminLoading from '@/app/profile/loading';

function Cartpage(): React.JSX.Element {
  return (
    <div className="my-16 lg:my-28 m-auto container">
      <Suspense fallback={<AdminLoading />}>
        <CheckoutWrapper />
      </Suspense>
    </div>
  );
}

export default Cartpage;
