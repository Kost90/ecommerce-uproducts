import { NavLink } from '../NavLink/Nav';

function AdminNavigationMenu() {
  return (
    <>
      <NavLink href="/profile" className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange">
        Dashboard
      </NavLink>
      <NavLink href="/profile/products" className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange">
        Products
      </NavLink>
      <NavLink href="/profile/addproduct" className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange">
        Add product
      </NavLink>
    </>
  );
}

export default AdminNavigationMenu;
