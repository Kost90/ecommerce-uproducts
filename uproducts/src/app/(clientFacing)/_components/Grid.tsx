import CardComponent from "./Card";
import { formatCurrency } from "@/lib/formatter";
import ProductsApi from "@/api/ProductsApi/ProductsApi";
import { getProductsUrl } from "@/app/admin/_actions/ProductsActions";

async function Grid() {
  const productsApi = await ProductsApi.getProducts();

  // !Делаю это на стороне сервера
  for (let product of productsApi) {
    product.imagePath = await getProductsUrl(product.imageKey);
  }

  return (
    <>
      <div className="flex h-full w-full lg:w-3/4">
        <CardComponent
          name={productsApi[0].name}
          price={formatCurrency(productsApi[0].priceInCents / 100)}
          picture={productsApi[0].imagePath as string}
        />
      </div>

      <div className="flex flex-col gap-4 items-center justify-center h-full w-full lg:w-1/4">
        <CardComponent
          name={productsApi[1].name}
          price={formatCurrency(productsApi[1].priceInCents / 100)}
          picture={productsApi[1].imagePath as string}
        />
        <CardComponent
          name={productsApi[2].name}
          price={formatCurrency(productsApi[2].priceInCents / 100)}
          picture={productsApi[2].imagePath as string}
        />
      </div>
    </>
  );
}

export default Grid;
