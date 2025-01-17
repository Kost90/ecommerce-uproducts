'use client';
import Image from 'next/image';
import { Nav, NavLink } from '@/components/NavLink/Nav';
import React, { lazy, useEffect, useState } from 'react';
import SearchInput from '@/components/searchInput/SearchInput';
import { Separator } from '@/components/ui/separator';
import Logo from '../../../public/assets/Logo_Uproducts.svg';
import MobileNavigationMenu from '../mobileNavigationMenu/MobileNavigationMenu';
import HamburgerIcon from '../hamburgerIcon/HamburgerIcon';
import HoverWrapper from '../hover/HoverWrapper';

const Cart = lazy(() => import('@/components/cart/CartComponent'));

function Header(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handelScroll = (): void => {
      const scrolled = window.scrollY;
      setIsScrolled(scrolled > 50);
    };

    window.addEventListener('scroll', handelScroll);

    return (): void => {
      window.removeEventListener('scroll', handelScroll);
    };
  }, []);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`container lg:max-w-full fixed top-0 z-50 transition-all right-0  left-0 ${isScrolled ? 'bg-white shadow-lg' : 'bg-amber-300'}`}
    >
      <Nav className="justify-between mt-3 items-center gap-0 sm:mb-1">
        <div className="flex justify-between items-center gap-2 md:min-w-72">
          <NavLink href="/">
            <div className="relative w-14 h-14 md:w-36 md:h-34">
              <Image src={Logo} alt="logo" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
          </NavLink>
          <HoverWrapper className="w-12 px-1">
            <NavLink href="/search" className="block">
              All
            </NavLink>
          </HoverWrapper>

          <SearchInput placeholder="Search..." className={'hidden md:flex'} />
        </div>
        <div className="flex items-center gap-3">
          <HamburgerIcon isOpen={isOpen} toggle={toggleMenu} />
          <Cart />
        </div>
        <MobileNavigationMenu isOpen={isOpen} onClick={toggleMenu} />
      </Nav>
      <SearchInput placeholder="Search..." className={'flex md:hidden mb-4'} />
      <Separator />
    </header>
  );
}

export default Header;
