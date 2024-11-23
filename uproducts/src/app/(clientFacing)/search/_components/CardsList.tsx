import ProductsApi from '@/api/services/productsServices/ProductsApi';
import FlexContainer from '@/components/containers/FlexContainer';
import { Product } from '@/constans/typeconstans';
import React from 'react';
import CardComponent from '../../_components/Card';
import { formatCurrency } from '@/lib/helpers/formatter';
import PaginationSection from './Pagination';

type Data = {
  products: Product[];
  total: number;
};

async function CardsList({ query, page }: { query: string; page: string | number }) {
  let data: Data = {
    products: [],
    total: 0,
  };
  if (query === '') {
    data = await ProductsApi.getProducts(page as string);
  } else {
    data.products = await ProductsApi.searchProducts(query);
  }

  if (data.products.length === 0) return <p>No products found</p>;

  return (
    <>
      <FlexContainer>
        {data.products.map((el, i) => (
          <CardComponent
            id={el.id as string}
            name={el.name}
            price={formatCurrency(el.priceInCents / 100)}
            description={el.description}
            key={i}
            picture={el.imagePath as string}
            className="md:w-[400px] md:h-[420px] w-full h-[400px]"
            imageHeigth="w-full max-h-[250px] h-full"
          />
        ))}
      </FlexContainer>
      {query.length === 0 ? <PaginationSection totalProducts={data.total} /> : null}
    </>
  );
}

export default CardsList;
