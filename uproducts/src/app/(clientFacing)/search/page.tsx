import { Suspense } from "react";
import CardsList from "./_components/CardsList";
import { CardListSkeleton } from "@/components/skeletons/CardSkeleton";

async function Search({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="flex flex-col">
      <Suspense fallback={<CardListSkeleton />}>
        <CardsList query={query} page={currentPage}/>
      </Suspense>
    </div>
  );
}

export default Search;
