import ProductForm from "@/app/admin/_components/ProductForm";
import ProductsApi from "@/api/ProductsApi/ProductsApi";

async function EditPage({ params: { id } }: { params: { id: string } }) {
  const product = await ProductsApi.getSingleProduct(id);

  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
}

export default EditPage;
