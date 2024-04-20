import React from "react";
import { Nav, NavLink } from "@/components/Nav";
import StoreProvider from "./StoreProvider";
import CartComponent from "./_components/CartComponent";

function CostumerFacingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <header className="container">
        <Nav className="justify-between">
          <NavLink href="/">Home</NavLink>
          <CartComponent />
        </Nav>
      </header>
      <main className="container my-6">{children}</main>
    </StoreProvider>
  );
}

export default CostumerFacingLayout;
