import React from 'react';
import Link from 'next/link';
import { TypographyMuted } from '../typography/TypographyMuted';

function SideMenuItem({ item, className, toggleMenu }: { item: string; className?: string; toggleMenu?: () => void }): React.JSX.Element {
  return (
    <div>
      <Link href={`/${item}`} onClick={toggleMenu}>
        <span className={`${className}`}>{item}</span>
      </Link>
    </div>
  );
}

export default SideMenuItem;
