'use client';

import TypographyH2 from '@/components/typography/TypographyH2';
import { Button } from '@/components/ui/button';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error);
  return (
    <html>
      <body>
        <div className="container mx-auto my-20">
          <TypographyH2 text={'Something went wrong! External server error.'} />
        </div>
      </body>
    </html>
  );
}
