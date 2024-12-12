import { Suspense } from 'react';
import CardsList from '../../../components/cardList/CardsList';
import { CardListSkeleton } from '@/components/skeletons/CardSkeleton';

async function Search({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="my-28 flex flex-col">
      <Suspense fallback={<CardListSkeleton />}>
        <CardsList query={query} page={currentPage} />
      </Suspense>
    </div>
  );
}

export default Search;
