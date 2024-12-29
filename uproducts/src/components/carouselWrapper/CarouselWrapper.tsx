import CarouselComponent from '../carouselComponent/CarouselComponent';
import ProductsApi from '@/api/services/productsServices/ProductsApi';

async function CarouselWrapper(): Promise<React.JSX.Element> {
  const productsApi = await ProductsApi.getProducts();
  const firstThree = productsApi ? productsApi.products.slice(0, 3) : [];
  if (firstThree.length === 0) {
    return <div className="hiddedn"></div>;
  }
  return <CarouselComponent firstThree={firstThree} />;
}

export default CarouselWrapper;
