import { Nav, NavLink } from '@/components/NavLink/Nav';

function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Nav>
          <NavLink href="/">Client side</NavLink>
          <NavLink href="/profile">Dashboard</NavLink>
          <NavLink href="/profile/products">Products</NavLink>
          <NavLink href="/profile/addproduct">Add product</NavLink>
        </Nav>
      </header>
      <div className="container my-6">{children}</div>
    </>
  );
}

export default AdminRootLayout;
