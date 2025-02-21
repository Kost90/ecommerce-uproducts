'use client';

import TypographyH2 from '@/components/typography/TypographyH2';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto my-20">
      <TypographyH2
        text={"Something went wrong! External server error. Currently I'm using free server deployment. Try to refresh the page."}
      />
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
