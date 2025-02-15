import { NavLink } from '../NavLink/Nav';

function AdminNavigationMenu({ className, toggleMenu }: { className?: string; toggleMenu?: () => void }) {
  return (
    <div className={`md:flex flex-col md:flex-row gap-2 ${className}`}>
      <NavLink href="/profile" className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange p-0" onClick={toggleMenu}>
        Dashboard
      </NavLink>
      <NavLink
        href="/profile/products"
        className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange p-0"
        onClick={toggleMenu}
      >
        Products
      </NavLink>
      <NavLink
        href="/profile/addproduct"
        className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange p-0"
        onClick={toggleMenu}
      >
        Add product
      </NavLink>
    </div>
  );
}

export default AdminNavigationMenu;
