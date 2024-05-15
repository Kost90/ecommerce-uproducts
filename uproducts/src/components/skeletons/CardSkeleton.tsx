import { Skeleton } from "@/components/ui/skeleton";

export function GridSkeleton() {
  return (
    <>
      <div className="flex h-full w-full lg:w-3/4">
        <CardSkeleton />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center h-full w-full lg:w-1/4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  );
}

function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 border border-slate-400 p-3 rounded-lg w-full h-full">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-[125px] w-[300px] rounded-xl" />
        <Skeleton className="h-[125px] w-[300px] rounded-xl" />
      </div>
    </div>
  );
}

export function CardListSkeleton() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-3 flex-wrap">
      <div className="w-full md:w-[400px]">
        <CardSkeleton />
      </div>
      <div className="w-full md:w-[400px]">
        <CardSkeleton />
      </div>
      <div className="w-full md:w-[400px]">
        <CardSkeleton />
      </div>
      <div className="w-full md:w-[400px]">
        <CardSkeleton />
      </div>
      <div className="w-full md:w-[400px]">
        <CardSkeleton />
      </div>
      <div className="w-full md:w-[400px]">
        <CardSkeleton />
      </div>
    </div>
  );
}
