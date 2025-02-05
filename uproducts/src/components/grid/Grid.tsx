import CardComponent from '../card/Card';
import { formatCurrency } from '@/helpers/formatter';
import ProductsApi from '@/api/services/productsServices/ProductsApi';
import { Product } from '@/constans/typeconstans';
import FlexContainer from '../containers/FlexContainer';

interface IProps {
  id: string;
  name: string;
  price: string;
  picture: string;
  description: string;
  className?: string;
  imageHeigth?: string;
}

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
    <FlexContainer className={'gap-0 items-center w-2/3'}>
      {productsApi.data.products.map((product, i) =>
        i < 6 ? renderCard(product, 'w-full max-h-[235px] h-full', 'max-w-[256px] max-h-[340px] border-0 rounded-none shadow-none') : null,
      )}
    </FlexContainer>
  );
}

export default Grid;
