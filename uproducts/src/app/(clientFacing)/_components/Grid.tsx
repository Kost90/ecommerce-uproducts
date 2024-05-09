import CardComponent from "./Card";
import { formatCurrency } from "@/lib/formatter";
import { Product } from "@/constans/typeconstans";
function Grid({ data }: { data: Product[] }) {
  return (
    <>
      <div className="flex h-full w-full lg:w-3/4">
        <CardComponent
          name={data[0].name}
          price={formatCurrency(data[0].priceInCents / 100)}
          picture={data[0].imagePath as string}
        />
      </div>

      <div className="flex flex-col gap-4 items-center justify-center h-full w-full lg:w-1/4">
        <CardComponent
          name={data[1].name}
          price={formatCurrency(data[1].priceInCents / 100)}
          picture={data[1].imagePath as string}
        />
        <CardComponent
          name={data[2].name}
          price={formatCurrency(data[2].priceInCents / 100)}
          picture={data[2].imagePath as string}
        />
      </div>
    </>
  );
}

export default Grid;
