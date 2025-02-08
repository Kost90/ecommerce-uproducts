'use client';
import Image from 'next/image';
import { Nav, NavLink } from '@/components/NavLink/Nav';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import SearchInput from '@/components/searchInput/SearchInput';
import { Separator } from '@/components/ui/separator';
import Logo from '../../../public/assets/Logo_Uproducts.svg';
import SignInIcon from '../../../public/assets/sign_in_icon.svg';
import MobileNavigationMenu from '../mobileNavigationMenu/MobileNavigationMenu';
import HamburgerIcon from '../hamburgerIcon/HamburgerIcon';
import NavigationMenu from '../navigationMenu/NavigationMenu';
// import { IUserResponse } from '@/constans/userTypes';

const Cart = lazy(() => import('@/components/cart/CartComponent'));

function Header(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [user, setUser] = useState<IUserResponse | null>(null);

  useEffect(() => {
    // TODO: Make user fetch
    // if (!user) {
    //   const response = await
    // }
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
      className={`container lg:max-w-full fixed top-0 z-50 transition-all right-0  left-0 ${isScrolled ? 'bg-white shadow-lg' : 'bg-inherit'}`}
    >
      <Nav className="flex flex-col mt-2 sm:mb-1 gap-2">
        <div className="flex justify-between items-center">
          <NavLink href="/">
            <div className="relative w-20 h-7 md:w-24">
              <Image src={Logo} alt="logo" fill className="object-cover" />
            </div>
          </NavLink>
          <div className="flex justify-center items-center gap-1">
            <div className="relative w-4 h-4 md:w-6 md:h-6">
              <Image src={SignInIcon} alt="sign_in_icon" fill className="object-cover" />
            </div>
            <NavLink href="/login" className="flex items-center gap-1 hover:text-orange">
              <span className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange">Sign in</span>
            </NavLink>
            <div className="text-grey-basic">/</div>
            <NavLink href="/register" className="flex items-center gap-1 hover:text-orange">
              <span className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange">Sign Up</span>
            </NavLink>
          </div>
        </div>
        <Separator className="bg-olive" />
        <div className="flex justify-between items-center gap-2 md:min-w-72">
          <NavLink
            href="/search"
            className="block bg-orange rounded-sm md:px-3 text-sm md:text-base text-black hover:text-muted-foreground"
          >
            All
          </NavLink>

          <div className="flex items-center gap-3">
            <Suspense>
              <SearchInput placeholder="Search..." className={'hidden md:flex lg:w-[500px]'} />
            </Suspense>
            <HamburgerIcon isOpen={isOpen} toggle={toggleMenu} />
            <Cart />
          </div>
        </div>
        <NavigationMenu />
        <SearchInput placeholder="Search..." className={'flex md:hidden mb-4'} />
        <MobileNavigationMenu isOpen={isOpen} onClick={toggleMenu} />
      </Nav>
    </header>
  );
}

export default Header;
