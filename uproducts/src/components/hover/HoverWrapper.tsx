import React from 'react';

type HoverWrapperProps = {
  children: React.ReactNode;
  className: string;
};

function HoverWrapper({ children, className }: HoverWrapperProps): React.JSX.Element {
  return (
    <div
      className={` hover:bg-violet-300 rounded-sm transition-colors duration-300 cursor-pointer flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}

export default HoverWrapper;
