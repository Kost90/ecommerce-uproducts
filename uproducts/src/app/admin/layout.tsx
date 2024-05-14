import { Nav, NavLink } from "@/components/Nav";

function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Client side</NavLink>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/addproduct">Add product</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}

export default AdminRootLayout;
