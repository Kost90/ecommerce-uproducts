'use client';
import { Product } from '@/constans/typeconstans';
import ButtonComponent from '@/components/button/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import { addProduct, updateProduct } from '../../app/profile/_actions/ProductsActions';
import { SelectComponent } from '../selectComponent/Select';

function ProductForm({ product }: { product?: Product | null }): JSX.Element {
  const [error, action] = useFormState(product == null ? addProduct : updateProduct.bind(null, product.id!), {});

  return (
    <>
      <form action={action} className="flex flex-col gap-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name of product:</Label>
          <Input type="text" name="name" placeholder="Product name" required defaultValue={product?.name || ''} />
          {error?.name && <div className="text-destructive">{error?.name}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Add photo:</Label>
          <Input type="file" name="image" accept="image/*" className="cursor-pointer max-w-80" required={product == null} />
          {error?.name && <div className="text-destructive">{error?.image}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceInCents">Price in cents:</Label>
          <Input type="number" name="priceInCents" required defaultValue={product !== null ? product?.priceInCents : 0} />
          {error?.priceInCents && <div className="text-destructive">{error?.priceInCents}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="categories">Choose categories:</Label>
          <SelectComponent name="categories" defaultValue={product !== null ? product?.categories : undefined} />
          {error?.categories && <div className="text-destructive">{error?.categories}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Product description:</Label>
          <Textarea
            name="description"
            placeholder="Add product description"
            defaultValue={product !== null ? product?.description : 0}
            required
          />
          {error?.description && <div className="text-destructive">{error?.description}</div>}
        </div>
        <ButtonComponent type="submit" text="Add" />
      </form>
    </>
  );
}

export default ProductForm;
