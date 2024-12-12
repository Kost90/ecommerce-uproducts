import React from 'react';

function Title({ text }: { text: string }): React.JSX.Element {
  return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{text}</h1>;
}

export default Title;
