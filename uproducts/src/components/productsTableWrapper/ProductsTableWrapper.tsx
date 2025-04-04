import Link from 'next/link';
import React, { Suspense } from 'react';
import ProductsTable from '../productsTable/ProductsTable';
import { Button } from '../ui/button';
import TypographyH1 from '../typography/TypographyH1';
import ProductsApi from '@/api/services/productsServices/ProductsApi';
import PaginationSection from '../pagination/Pagination';

async function ProductsTableWrapper({ page }: { page: string }): Promise<React.JSX.Element> {
  try {
    const response = await ProductsApi.getProducts(page as string);
    return (
      <>
        <div className="flex justify-between items-center gap-4">
          <TypographyH1 text="Products list:" />
          <Button asChild>
            <Link href="/profile/addproduct">Add Product</Link>
          </Button>
        </div>

        <ProductsTable data={response} />

        <Suspense>
          <PaginationSection totalProducts={response.data.total} />
        </Suspense>
      </>
    );
  } catch (error) {
    if (error instanceof Error) {
      return <TypographyH1 text={error.message} />;
    } else {
      return <TypographyH1 text={'Oops something went wrong'} />;
    }
  }
}

export default ProductsTableWrapper;
