import ProductsTableWrapper from '@/components/productsTableWrapper/ProductsTableWrapper';
import { Suspense } from 'react';
import AdminLoading from '../loading';

interface Props {
  searchParams: { page?: string };
}

function ProductsPage({ searchParams }: Props): JSX.Element {
  const page = searchParams.page || '1';
  return (
    <>
      <Suspense fallback={<AdminLoading />}>
        <ProductsTableWrapper page={page} />
      </Suspense>
    </>
  );
}

export default ProductsPage;
