'use client';
import React from 'react';

function TypographyH3({ text, id, lang, title }: { text: string; id?: string; lang?: string; title?: string }): React.JSX.Element {
  return (
    <h2 id={id} lang={lang} title={title || text} className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {text}
    </h2>
  );
}

export default TypographyH3;
