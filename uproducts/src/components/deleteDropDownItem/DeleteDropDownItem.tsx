'use client';
import { Button } from '@/components/ui/button';
import { deleteProduct } from '../../app/profile/_actions/ProductsActions';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

function DeleteDropDownItem({ id, filename }: { id: string; filename: string }) {
  const [, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id, filename);
          router.refresh();
        });
      }}
      className="w-full"
      variant="destructive"
    >
      Delete
    </Button>
  );
}

export default DeleteDropDownItem;
