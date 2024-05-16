import ProductsApi from "@/api/ProductsApi/ProductsApi";
import FlexContainer from "@/components/containers/FlexContainer";
import { Product } from "@/constans/typeconstans";
import React from "react";
import CardComponent from "../../_components/Card";
import { formatCurrency } from "@/lib/formatter";

async function CardsList({ query }: { query: string }) {
  let products: Product[] = [];
  if (query === "") {
    products = await ProductsApi.getProducts();
  } else {
    products = await ProductsApi.searchProducts(query);
  }

  if (products.length === 0) return <p>No products found</p>;

  return (
    <FlexContainer>
      {products.map((el, i) => (
        <CardComponent
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
  );
}

export default CardsList;
