import ProductForm from "@/app/admin/_components/ProductForm";

async function EditPage({ params: { id } }: { params: { id: string } }) {
  const product = await getData({id});

  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
}

async function getData({id}:{id:string}) {
  const res = await fetch(`http://localhost:3001/products/edit/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const product = await res.json();

  return product;
}

export default EditPage;
