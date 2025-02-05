import React from 'react';

function CustomBorder({ className }: { className?: string }) {
  return <div className={`w-full border-b border-b-orange border-dashed ${className}`}></div>;
}

export default CustomBorder;
