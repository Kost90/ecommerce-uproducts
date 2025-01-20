'use client';

import TypographyH2 from '@/components/typography/TypographyH2';
import { Button } from '@/components/ui/button';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error);
  return (
    <html>
      <body>
        <TypographyH2 text={'Something went wrong! External server error.'} />
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
