import CardComponent from '../card/Card';
import { formatCurrency } from '@/helpers/formatter';
import ProductsApi from '@/api/services/productsServices/ProductsApi';
import FlexContainer from '../containers/FlexContainer';
import { Product } from '@/types/productTypes';

async function Grid(): Promise<JSX.Element> {
  const productsApi = await ProductsApi.getProducts();

  const renderCard = (product: Product, imageHeight: string, className: string): JSX.Element => (
    <CardComponent
      key={product.id}
      id={product.id!}
      name={product.name}
      description={product.description}
      price={formatCurrency(product.priceInCents / 100)}
      picture={product.imagePath as string}
      imageHeigth={imageHeight}
      className={className}
    />
  );

  return (
    <FlexContainer className={'gap-0 items-center w-full max-w-[878px]'}>
      {productsApi.data.products.map((product, i) =>
        i < 6 ? renderCard(product, 'w-full max-h-[235px] h-full', 'max-w-[256px] max-h-[340px] border-0 rounded-none shadow-none') : null,
      )}
    </FlexContainer>
  );
}

export default Grid;
