import { Suspense } from "react";
import Grid from "./_components/Grid";
import { GridSkeleton } from "@/components/skeletons/CardSkeleton";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center gap-3 flex-col lg:flex-row h-full lg:h-[960px] w-full">
        <Suspense fallback={<GridSkeleton />}>
          <Grid />
        </Suspense>
      </div>
    </div>
  );
}
