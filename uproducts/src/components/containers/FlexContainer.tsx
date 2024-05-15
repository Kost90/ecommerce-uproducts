import React from "react";

function FlexContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-3 flex-wrap">
      {children}
    </div>
  );
}

export default FlexContainer;
