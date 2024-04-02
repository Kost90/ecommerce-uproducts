import React from 'react'

function CostumerFacingLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>{children}</div>
  )
}

export default CostumerFacingLayout