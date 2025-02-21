'use client';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/productTypes';

function CarouselComponent({ firstThree }: { firstThree: Product[] }): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleIndicatorClick = useCallback(
    (index: number): void => {
      if (api) {
        api.scrollTo(index);
      }
    },
    [api],
  );

  return (
    <div className="w-full my-5">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {firstThree.map((el) => (
            <CarouselItem key={`${el.id}`}>
              <div className="relative h-80 p-1 aspect-auto">
                <Link href={`/productdetails/${el.id}`}>
                  <Image
                    fill
                    quality={85}
                    className="object-cover w-full h-full transition-all duration-500 ease-in-out transform hover:scale-105 rounded-sm"
                    sizes="100vw"
                    src={el.imagePath as string}
                    alt={`${el.name}-picture`}
                  />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center mt-3 space-x-2">
        {firstThree.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index + 1 === current ? 'bg-black' : 'bg-gray-300'}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselComponent;
