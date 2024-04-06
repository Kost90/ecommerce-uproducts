import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import Link from "next/link";
import { getProductsUrl } from "../_actions/ProductsActions";
import { MoreVertical } from "lucide-react";
import DeleteDropDownItem from "./_components/DeleteDropDownItem";
import { formatCurrency } from "@/lib/formatter";

function ProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <Title text="Products list:" />
        <Button asChild>
          <Link href="/admin/addproduct">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

// Function for fetching data from server and DB
async function getData() {
  const res = await fetch("http://localhost:3001/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const products = await res.json();

  for (let product of products) {
    product.imagePath = await getProductsUrl(product.imageKey);
  }

  return products;
}

// Function displayed table with products data
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
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Maping received products from DB */}

        {products.map((product: any) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
            <TableCell>
              <div className="sm:w-32 sm:h-32 relative w-10 h-10">
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
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Button asChild className="w-full my-1">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Link>
                  </Button>

                  {/* Dropdown for edit and Delete buttons */}

                  <DropdownMenuItem asChild>
                    <DeleteDropDownItem
                      id={product.id}
                      filename={product.imageKey}
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ProductsPage;
