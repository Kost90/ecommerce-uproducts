'use client';
import Image from 'next/image';
import { Nav, NavLink } from '@/components/NavLink/Nav';
import React, { lazy, useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import CartComponent from '../CartComponent';
import { Separator } from '@/components/ui/separator';
import Logo from '../../../../../public/assets/Logo_Uproducts.svg';

const Cart = lazy(() => import('../CartComponent'));

function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handelScroll = () => {
      const scrolled = window.scrollY;
      setIsScrolled(scrolled > 50);
    };

    window.addEventListener('scroll', handelScroll);

    return () => {
      window.removeEventListener('scroll', handelScroll);
    };
  }, []);

  return (
    <header
      className={`container max-w-screen-2xl fixed top-0 z-50 transition-all ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}
    >
      <Nav className="justify-between mt-3 items-center">
        <div className="flex justify-between items-center gap-3">
          <NavLink href="/">
            <div className="relative w-14 h-14 md:w-36 md:h-34">
              <Image src={Logo} alt="logo" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
          </NavLink>
          <NavLink href="/search">All</NavLink>
          <SearchInput placeholder="Search for products name..." />
        </div>
        <CartComponent />
      </Nav>
      <Separator />
    </header>
  );
}

export default Header;
