import CardComponent from "./Card";
import { formatCurrency } from "@/lib/formatter";
import ProductsApi from "@/api/ProductsApi/ProductsApi";

async function Grid() {
  const productsApi = await ProductsApi.getProducts();

  return (
    <>
      <div className="flex h-full w-full lg:w-3/4">
        {/* Remove hardcode */}
        <CardComponent
          name={productsApi.products[0].name}
          description={productsApi.products[0].description}
          price={formatCurrency(productsApi.products[0].priceInCents / 100)}
          picture={productsApi.products[0].imagePath as string}
          imageHeigth="w-full max-h-[500px] h-full"
        />
      </div>

      <div className="flex flex-col gap-4 items-center justify-center h-full w-full lg:w-1/4">
        <CardComponent
          name={productsApi.products[1].name}
          description={productsApi.products[1].description}
          price={formatCurrency(productsApi.products[1].priceInCents / 100)}
          picture={productsApi.products[1].imagePath as string}
          imageHeigth="w-full max-h-[300px] h-full"
        />
        <CardComponent
          name={productsApi.products[2].name}
          description={productsApi.products[2].description}
          price={formatCurrency(productsApi.products[2].priceInCents / 100)}
          picture={productsApi.products[2].imagePath as string}
          imageHeigth="w-full max-h-[300px] h-full"
        />
      </div>
    </>
  );
}

export default Grid;
