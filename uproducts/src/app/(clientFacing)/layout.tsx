import React from "react";
import { Nav, NavLink } from "@/components/Nav";
import { ShoppingCart } from "lucide-react";
import CartComponent from "./_components/CartComponent";

function CostumerFacingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="container">
        <Nav className="justify-between">
          <NavLink href="/">Home</NavLink>
          <CartComponent />
        </Nav>
      </header>
      <main className="container my-6">{children}</main>
    </>
  );
}

export default CostumerFacingLayout;
