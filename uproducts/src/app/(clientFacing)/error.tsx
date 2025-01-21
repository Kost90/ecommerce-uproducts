'use client';

import TypographyH2 from '@/components/typography/TypographyH2';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto my-20">
      <TypographyH2 text={'Something went wrong! External server error.'} />
      <Button
        onClick={() => {
          reset();
          router.replace(router.asPath);
        }}
      >
        Try again
      </Button>
    </div>
  );
}
