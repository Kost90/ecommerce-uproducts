'use client';

import TypographyH2 from '@/components/typography/TypographyH2';

export default function GlobalError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
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
