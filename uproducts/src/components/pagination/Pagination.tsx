'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

function PaginationSection({ totalProducts }: { totalProducts: number }): JSX.Element {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const pageNumbers = useMemo(() => {
    const pages = Math.ceil(totalProducts / 6);
    return Array.from({ length: pages }, (_, index) => index + 1);
  }, [totalProducts]);

  const createPageURL = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <Pagination className="my-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={createPageURL(currentPage - 1)}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
                className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
              />
            </PaginationItem>
            {currentPage - 1 === 0 ? null : (
              <PaginationItem>
                <PaginationLink href={createPageURL(currentPage - 1)}>{currentPage - 1}</PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={createPageURL(currentPage)} isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {currentPage >= pageNumbers.length ? null : (
              <PaginationItem>
                <PaginationLink href={createPageURL(currentPage + 1)}>{currentPage + 1}</PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>{currentPage >= pageNumbers.length ? null : <PaginationEllipsis />}</PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={createPageURL(currentPage + 1)}
                aria-disabled={currentPage >= pageNumbers.length}
                className={currentPage >= pageNumbers.length ? 'pointer-events-none opacity-50' : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default PaginationSection;
