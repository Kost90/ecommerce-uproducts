import { formatCurrency } from '@/helpers/formatter';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import DeleteDropDownItem from '../deleteDropDownItem/DeleteDropDownItem';
import { Button } from '../ui/button';
import { Product, IProductsResponse } from '@/constans/typeconstans';

async function ProductsTable({ data }: { data: IProductsResponse }): Promise<JSX.Element> {
  // Todo:Catch error with toaster and errorhandler and check status
  if (data?.error) {
    return <p>Something went wrong</p>;
  }

  if (data && data.data.products.length === 0) return <p>No products found</p>;

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
        {data.data.products.map((product: Product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
            <TableCell>{product.categories}</TableCell>
            <TableCell>
              <div className="sm:w-32 sm:h-32 relative w-10 h-10">
                <Image
                  src={product.imagePath as string}
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

                  <DropdownMenuItem asChild>
                    <DeleteDropDownItem id={product.id!} filename={product.imageKey!} />
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

export default ProductsTable;
