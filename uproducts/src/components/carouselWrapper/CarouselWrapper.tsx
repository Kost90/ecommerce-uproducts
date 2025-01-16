import CarouselComponent from '../carouselComponent/CarouselComponent';
import ProductsApi from '@/api/services/productsServices/ProductsApi';

async function CarouselWrapper(): Promise<React.JSX.Element> {
  try {
    const response = await ProductsApi.getProducts();
    const firstThree = response.data.products ? response.data.products.slice(0, 3) : [];
    if (firstThree.length === 0) {
      return <div className="hiddedn"></div>;
    }
    return <CarouselComponent firstThree={firstThree} />;
  } catch (error) {
    
  }
}

export default CarouselWrapper;
