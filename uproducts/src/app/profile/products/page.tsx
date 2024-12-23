import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Title from '@/components/ui/title';
import Link from 'next/link';
import { MoreVertical } from 'lucide-react';
import DeleteDropDownItem from '../../../components/deleteDropDownItem/DeleteDropDownItem';
import { formatCurrency } from '@/lib/helpers/formatter';
import ProductsApi from '@/api/services/productsServices/ProductsApi';

function ProductsPage(): JSX.Element {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <Title text="Products list:" />
        <Button asChild>
          <Link href="/profile/addproduct">Add Product</Link>
        </Button>
      </div>

      {/* Сделать скелетон для таблицы */}
      <ProductsTable />
    </>
  );
}

// ! Добавить пагинацию для таблицы
// Function displayed table with products data
async function ProductsTable(): Promise<JSX.Element> {
  const data = await ProductsApi.getProducts();

  if (!data) {
    return <p>Something went wrong</p>;
  }

  if (data && data.products.length === 0) return <p>No products found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Categories</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Maping received products from DB */}

        {data.products.map((product: any) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
            <TableCell>{product.categories}</TableCell>
            <TableCell>
              <div className="sm:w-32 sm:h-32 relative w-10 h-10">
                <Image
                  src={product.imagePath}
                  alt="product_image"
                  fill
                  style={{
                    objectFit: 'cover',
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
                    <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                  </Button>

                  {/* Dropdown for edit and Delete buttons */}

                  <DropdownMenuItem asChild>
                    <DeleteDropDownItem id={product.id} filename={product.imageKey} />
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
