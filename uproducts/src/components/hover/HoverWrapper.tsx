import React from 'react';

type HoverWrapperProps = {
  children: React.ReactNode;
  className: string;
};

function HoverWrapper({ children, className }: HoverWrapperProps): React.JSX.Element {
  return <div className={` hover:bg-gray-100 rounded-sm transition-colors duration-300 cursor-pointer ${className}`}>{children}</div>;
}

export default HoverWrapper;
