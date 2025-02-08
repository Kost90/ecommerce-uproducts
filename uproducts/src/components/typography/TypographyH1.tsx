import React from 'react';

function TypographyH1({
  text,
  id,
  lang,
  title,
  className,
}: {
  text: string;
  id?: string;
  lang?: string;
  title?: string;
  className?: string;
}): React.JSX.Element {
  return (
    <h1 id={id} lang={lang} title={title || text} className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>
      {text}
    </h1>
  );
}

export default TypographyH1;
