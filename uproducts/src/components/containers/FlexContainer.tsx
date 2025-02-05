import React from 'react';

function FlexContainer({
  className,
  children,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <div className={`flex flex-col md:flex-row justify-center items-start gap-3 flex-wrap ${className}`}>{children}</div>;
}

export default FlexContainer;
