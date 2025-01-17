import CarouselComponent from '../carouselComponent/CarouselComponent';
import ProductsApi from '@/api/services/productsServices/ProductsApi';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

async function CarouselWrapper(): Promise<React.JSX.Element> {
  const response = await ProductsApi.getProducts();
  const firstThree = response.data.products ? response.data.products.slice(0, 3) : [];

  if (response.error) {
    return <ErrorHandler error={response.error} />;
  }

  if (firstThree.length === 0) {
    return <div className="hiddedn"></div>;
  }
  return <CarouselComponent firstThree={firstThree} />;
}

export default CarouselWrapper;
