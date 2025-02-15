'use client';
import { Nav, NavLink } from '@/components/NavLink/Nav';
import { usersRolesList } from '@/constans/userRolesLists';

import { useGetUserQuery } from '@/lib/redux/apiSlice/apiSlice';

function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const { data } = useGetUserQuery();

  if (data?.data?.role !== usersRolesList.admin) {
    return (
      <>
        <header>
          <Nav>
            <NavLink href="/">Client side</NavLink>
          </Nav>
        </header>
        <div className="container my-6 overflow-y-auto min-h-screen">{children}</div>
      </>
    );
  }

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
      <div className="container my-6 overflow-y-auto min-h-screen">{children}</div>
    </>
  );
}

export default AdminRootLayout;
