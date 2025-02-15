import ProductsApi from '@/api/services/productsServices/ProductsApi';
import FlexContainer from '@/components/containers/FlexContainer';
import { IProductsResponse } from '@/types/productTypes';
import CardComponent from '../card/Card';
import { formatCurrency } from '@/helpers/formatter';
import PaginationSection from '../pagination/Pagination';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import { Suspense } from 'react';

async function fetchProducts(query: string, page: number, category?: string): Promise<Partial<IProductsResponse>> {
  try {
    if (query.length !== 0) {
      return await ProductsApi.searchProducts(query);
    }

    if (category) {
      return await ProductsApi.getProductsByCategory(category, page.toString());
    }

    return await ProductsApi.getProducts(page.toString());
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error occurred');
    return {
      status: 500,
      data: {
        products: [],
        total: 0,
      },
      error: {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        type: 'Server Error',
      },
    };
  }
}

async function CardsList({ query, page, category }: { query: string; page: number; category?: string }): Promise<JSX.Element> {
  const data = await fetchProducts(query, page, category);

  if (data?.error) {
    return <ErrorHandler error={data.error} />;
  }

  if (!data.data || data.data.products.length === 0) {
    return <p className="text-center text-gray-600">No products found</p>;
  }

  return (
    <>
      <FlexContainer>
        {data.data!.products.map((product) => (
          <CardComponent
            key={product.id}
            id={product.id!}
            name={product.name}
            price={formatCurrency(product.priceInCents / 100)}
            description={product.description}
            picture={(product.imagePath as string) || ''}
            className="md:w-[400px] md:h-[420px] w-full h-[400px]"
            imageHeigth="w-full max-h-[250px] h-full"
          />
        ))}
      </FlexContainer>
      {!query && data.data && (
        <Suspense>
          <PaginationSection totalProducts={data.data.total} />
        </Suspense>
      )}
    </>
  );
}

export default CardsList;
