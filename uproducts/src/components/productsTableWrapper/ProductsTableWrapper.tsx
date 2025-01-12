import Link from 'next/link';
import React from 'react';
import ProductsTable from '../productsTable/ProductsTable';
import { Button } from '../ui/button';
import TypographyH1 from '../typography/TypographyH1';
import ProductsApi from '@/api/services/productsServices/ProductsApi';
import PaginationSection from '../pagination/Pagination';

async function ProductsTableWrapper({ page }: { page: string }): Promise<React.JSX.Element> {
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

      <PaginationSection totalProducts={response.data.total} />
    </>
  );
}

export default ProductsTableWrapper;
