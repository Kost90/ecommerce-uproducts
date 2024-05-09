import { getData } from "@/lib/utils";
import CardComponent from "./_components/Card";
import { formatCurrency } from "@/lib/formatter";
import Grid from "./_components/Grid";

export default async function Home() {
  const products = await getData();

  // !Сделать функцию которая будет фильтровать самые популярные + делаю fallback + suspense

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center gap-3 flex-col lg:flex-row h-full lg:h-[960px] w-full">
        <Grid data={products}/>
        {/* Выношу это потом в отдельный компонент как грид + делаю suspense для отображения скелетон пока не загрузятся*/}
      </div>
    </div>
  );
}
