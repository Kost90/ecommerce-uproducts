import ProductsApi from "@/api/ProductsApi/ProductsApi";
import Image from "next/image";
import { getData } from "@/lib/utils";
import CardComponent from "./_components/Card";
import { formatCurrency } from "@/lib/formatter";

export default async function Home() {
  const products = await getData();

  // !Сделать функцию которая будет фильтровать самые популярные

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center gap-3 flex-col lg:flex-row h-full lg:h-[960px] w-full">
        
        {/* Выношу это потом в отдельный компонент как грид + делаю suspense для отображения скелетон пока не загрузятся*/}

        <div className="flex h-full w-full lg:w-3/4">
          <CardComponent
            name={products[0].name}
            price={formatCurrency(products[0].priceInCents / 100)}
            picture={products[0].imagePath}
          />
        </div>

        <div className="flex flex-col gap-4 items-center justify-center h-full w-full lg:w-1/4">
          <CardComponent
            name={products[1].name}
            price={formatCurrency(products[1].priceInCents / 100)}
            picture={products[1].imagePath}
          />
          <CardComponent
            name={products[2].name}
            price={formatCurrency(products[2].priceInCents / 100)}
            picture={products[2].imagePath}
          />
        </div>
      </div>
    </div>
  );
}
