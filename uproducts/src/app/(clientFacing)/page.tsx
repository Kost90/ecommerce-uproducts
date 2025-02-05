import { Suspense } from 'react';
import { GridSkeleton } from '@/components/skeletons/CardSkeleton';
import CarouselSkeleton from '@/components/skeletons/CarouselSkeleton';
import CarouselWrapper from '@/components/carouselWrapper/CarouselWrapper';
import HeroSection from '@/components/heroSection/HeroSection';

export default async function Home(): Promise<JSX.Element> {
  return (
    <div className="min-h-screen my-20 md:my-10">
      <Suspense fallback={<CarouselSkeleton />}>
        <CarouselWrapper />
      </Suspense>

      <div className="flex items-center justify-center gap-3 flex-col lg:flex-row h-full lg:h-[960px] w-full">
        <Suspense fallback={<GridSkeleton />}>
          <HeroSection />
        </Suspense>
      </div>
    </div>
  );
}
