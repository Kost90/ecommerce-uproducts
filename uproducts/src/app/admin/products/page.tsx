import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProductsUrl } from "../_actions/ProductsActions";

function page() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <h1>Products page</h1>
        <Button asChild>
          <Link href="/admin/addproduct">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function getData() {
  const res = await fetch("http://localhost:3001/products", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const products = await res.json();

  for (let product of products) {
    product.imagePath = await getProductsUrl(product.imagePath);
  }

  return products;
}

// TODO:Add sceleton befor data is not fetched.

async function ProductsTable() {
  const products = await getData();

  if (products.length === 0) return <p>No products found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Description</TableHead>
          {/* <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* TODO: Make anotation for params */}

        {products.map((product: any) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>

            {/* TODO: Make function for convert cents to dollars */}

            {/* <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell> */}

            <TableCell>{product.priceInCents}</TableCell>
            <TableCell>
              <div className="w-32 h-32 relative">
                <Image
                  src={product.imagePath}
                  alt="product_image"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </TableCell>
            <TableCell>{product.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default page;
