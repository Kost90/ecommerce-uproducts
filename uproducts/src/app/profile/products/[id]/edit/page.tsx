import ProductForm from '@/components/productForm/ProductForm';
import ProductsApi from '@/api/services/productsServices/ProductsApi';

async function EditPage({ params: { id } }: { params: { id: string } }): Promise<JSX.Element> {
  const product = await ProductsApi.getSingleProduct(id);

  return (
    <div>
      <ProductForm product={product.data} />
    </div>
  );
}

export default EditPage;
