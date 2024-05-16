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
          name={productsApi[0].name}
          description={productsApi[0].description}
          price={formatCurrency(productsApi[0].priceInCents / 100)}
          picture={productsApi[0].imagePath as string}
          imageHeigth="w-full max-h-[500px] h-full"
        />
      </div>

      <div className="flex flex-col gap-4 items-center justify-center h-full w-full lg:w-1/4">
        <CardComponent
          name={productsApi[1].name}
          description={productsApi[1].description}
          price={formatCurrency(productsApi[1].priceInCents / 100)}
          picture={productsApi[1].imagePath as string}
          imageHeigth="w-full max-h-[300px] h-full"
        />
        <CardComponent
          name={productsApi[2].name}
          description={productsApi[2].description}
          price={formatCurrency(productsApi[2].priceInCents / 100)}
          picture={productsApi[2].imagePath as string}
          imageHeigth="w-full max-h-[300px] h-full"
        />
      </div>
    </>
  );
}

export default Grid;
