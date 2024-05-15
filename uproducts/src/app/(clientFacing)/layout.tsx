import { Nav, NavLink } from "@/components/Nav";
import Image from "next/image";
import Logo from "../../../public/assets/Logo_Uproducts.svg";
import StoreProvider from "./StoreProvider";
import CartComponent from "./_components/CartComponent";
import SearchInput from "./_components/SearchInput";
import { Separator } from "@/components/ui/separator";

function CostumerFacingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <header className="container max-w-screen-2xl">
        <Nav className="justify-between mt-3 items-center">
          <div className="flex justify-between items-center gap-3">
            <NavLink href="/">
              <div className="w-14 md:w-36">
                <Image src={Logo} alt="logo" layout="responsive" />
              </div>
            </NavLink>
            <NavLink href="/search">All</NavLink>
            <SearchInput placeholder="Search for products..." />
          </div>
          <CartComponent />
        </Nav>
        <Separator />
      </header>
      <main className="container my-6">{children}</main>
    </StoreProvider>
  );
}

export default CostumerFacingLayout;
