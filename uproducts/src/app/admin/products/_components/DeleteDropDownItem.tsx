"use client";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "../../_actions/ProductsActions";
import { startTransition, useTransition } from "react";
import { useRouter } from "next/navigation";

function DeleteDropDownItem({
  id,
  filename,
}: {
  id: string;
  filename: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id, filename);
          router.refresh();
        });
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteDropDownItem;
