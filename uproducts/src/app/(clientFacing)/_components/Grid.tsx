import CardComponent from './Card';
import { formatCurrency } from '@/lib/formatter';
import ProductsApi from '@/api/ProductsApi/ProductsApi';
import { Product } from '@/constans/typeconstans';

async function Grid() {
  const productsApi = await ProductsApi.getProducts();
  const firstThree = productsApi ? productsApi.products.slice(0, 3) : [];

  const firstItem = firstThree[0];
  const otherItems = firstThree.slice(1);

  const renderCard = (product: Product, imageHeight: string) => (
    <CardComponent
      key={product.id}
      id={product.id as string}
      name={product.name}
      description={product.description}
      price={formatCurrency(product.priceInCents / 100)}
      picture={product.imagePath as string}
      imageHeigth={imageHeight}
    />
  );

  return (
    <>
      <div className="flex h-full w-full lg:col-span-3">{firstItem && renderCard(firstItem, 'w-full max-h-[500px] h-full')}</div>

      <div className="flex flex-col gap-4 items-center justify-center h-full w-full">
        {otherItems.map((product: Product) => renderCard(product, 'w-full max-h-[300px] h-full'))}
      </div>
    </>
  );
}

export default Grid;
