import { Suspense } from 'react';
import Grid from '../../components/homeClientFacingGrid/Grid';
import { GridSkeleton } from '@/components/skeletons/CardSkeleton';

export default async function Home(): Promise<JSX.Element> {
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
