import React from 'react';

function TypographyH2({ text, id, lang, title }: { text: string; id?: string; lang?: string; title?: string }): React.JSX.Element {
  return (
    <h2 id={id} lang={lang} title={title || text} className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {text}
    </h2>
  );
}

export default TypographyH2;
