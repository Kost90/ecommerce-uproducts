import ProductsApi from '@/api/services/productsServices/ProductsApi';
import FlexContainer from '@/components/containers/FlexContainer';
import { Product } from '@/constans/typeconstans';
import CardComponent from '../card/Card';
import { formatCurrency } from '@/helpers/formatter';
import PaginationSection from '../pagination/Pagination';

type Data = {
  status: number;
  data: {
    products: Product[];
    total: number;
  };
  message: string;
  error?: {
    statusCode: number;
    message: string;
    type: string;
  };
};

async function fetchProducts(query: string, page: number, category?: string): Promise<Data> {
  if (query.length !== 0) {
    const response = await ProductsApi.searchProducts(query);
    return response;
  }

  if (category) {
    return await ProductsApi.getProductsByCategory(category, page.toString());
  }

  return await ProductsApi.getProducts(page.toString());
}

async function CardsList({ query, page, category }: { query: string; page: number; category?: string }): Promise<JSX.Element> {
  const data = await fetchProducts(query, page, category);

  // TODO:Make error handler

  if (data.error) {
    return <p className="text-center text-gray-600">Product name must be at least 3 characters</p>;
  }

  if (data.data.products.length === 0) {
    return <p className="text-center text-gray-600">No products found</p>;
  }

  return (
    <>
      <FlexContainer>
        {data.data.products.map((product) => (
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
      {!query && <PaginationSection totalProducts={data.data.total} />}
    </>
  );
}

export default CardsList;
