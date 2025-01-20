'use client'; // Error components must be Client Components

import TypographyH2 from '@/components/typography/TypographyH2';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <TypographyH2 text={'Something went wrong! External server error.'} />
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
