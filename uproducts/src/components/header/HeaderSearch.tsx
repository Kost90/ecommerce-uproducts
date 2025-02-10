import { Suspense } from 'react';
import SearchInput from '@/components/searchInput/SearchInput';
import HamburgerIcon from '../hamburgerIcon/HamburgerIcon';
import Cart from '@/components/cart/CartComponent';

interface HeaderSearchProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div className="flex items-center gap-3 justify-end">
      <Suspense>
        <SearchInput placeholder="Search..." className={'flex lg:w-[500px]'} />
      </Suspense>
      <HamburgerIcon isOpen={isOpen} toggle={toggleMenu} />
      <Cart />
    </div>
  );
};

export default HeaderSearch;
