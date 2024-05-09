import Grid from "./_components/Grid";
import ProductsApi from "@/api/ProductsApi/ProductsApi";
import { getProductsUrl } from "../admin/_actions/ProductsActions";

export default async function Home() {
  const productsApi = await ProductsApi.getProducts();

  // !Делаю это на стороне сервера
  for (let product of productsApi) {
    product.imagePath = await getProductsUrl(product.imageKey);
  }

  // !Сделать функцию которая будет фильтровать самые популярные + делаю fallback + suspense

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center gap-3 flex-col lg:flex-row h-full lg:h-[960px] w-full">
        {/* Делаю  fallback + suspense + skeleton*/}
        <Grid data={productsApi} />
      </div>
    </div>
  );
}
