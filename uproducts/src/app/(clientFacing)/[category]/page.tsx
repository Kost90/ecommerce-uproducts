import CardsList from '@/components/cardList/CardsList';
import { CardListSkeleton } from '@/components/skeletons/CardSkeleton';
import React, { Suspense } from 'react';

function page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}): React.JSX.Element {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="my-28 flex flex-col">
      <Suspense fallback={<CardListSkeleton />}>
        <CardsList query={query} page={currentPage} category={params.category} />
      </Suspense>
    </div>
  );
}

export default page;
