import React from 'react';
import Link from 'next/link';
import { TypographyLead } from '../typography/TypographyLead';

function SideMenuItem({ item }: { item: string }): React.JSX.Element {
  return (
    <div>
      <Link href={`/${item}`}>
        <TypographyLead text={item} />
      </Link>
    </div>
  );
}

export default SideMenuItem;
