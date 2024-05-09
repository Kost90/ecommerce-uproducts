import React from "react";
import { Nav, NavLink } from "@/components/Nav";
import StoreProvider from "./StoreProvider";
import CartComponent from "./_components/CartComponent";
import SearchInput from "./_components/SearchInput";
import ReactQueryProvider from "@/providers/queryClientProvider";

function CostumerFacingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <StoreProvider>
        <header className="container max-w-screen-2xl">
          <Nav className="justify-between mt-3">
            {/* Сюда надо добавить лого и название магазина */}
            <NavLink href="/">Home</NavLink>
            {/* Сюда добавляю search input для поиска товаров */}
            <NavLink href="/search">All</NavLink>
            {/* Добавляю ссілку на все товарі  */}
            <SearchInput placeholder="Search for products..." />
            <CartComponent />
          </Nav>
        </header>
        <main className="container my-6">{children}</main>
      </StoreProvider>
    </ReactQueryProvider>
  );
}

export default CostumerFacingLayout;
