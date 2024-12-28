'use client';
import Image from 'next/image';
import { Nav, NavLink } from '@/components/NavLink/Nav';
import React, { lazy, useEffect, useState } from 'react';
import SearchInput from '@/components/searchInput/SearchInput';
import { Separator } from '@/components/ui/separator';
import Logo from '../../../public/assets/Logo_Uproducts.svg';
import MobileNavigationMenu from '../mobileNavigationMenu/MobileNavigationMenu';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { animations } from '@/lib/animations/animations';

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
      className={`container lg:max-w-full fixed top-0 z-50 transition-all right-0 left-0 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}
    >
      <Nav className="justify-between mt-3 items-center gap-2">
        <div className="flex justify-between items-center gap-3 md:min-w-72">
          <NavLink href="/">
            <div className="relative w-14 h-14 md:w-36 md:h-34">
              <Image src={Logo} alt="logo" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
          </NavLink>
          <NavLink href="/search" className="block">
            All
          </NavLink>
          <SearchInput placeholder="Search..." />
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleMenu}
            className="lg:hidden focus:outline-none"
            aria-label="Toggle menu"
            variants={animations.iconRotation}
            initial="initial"
            animate={isOpen ? 'animateOpen' : 'animateClosed'}
          >
            {isOpen ? (
              <motion.div variants={animations.iconAppear} initial="initial" animate="animate">
                <X className="w-6 h-6 text-slate-500" />
              </motion.div>
            ) : (
              <motion.div variants={animations.iconAppear} initial="initial" animate="animate">
                <Menu className="w-6 h-6 text-slate-500" />
              </motion.div>
            )}
          </motion.button>
          <Cart />
        </div>
        <MobileNavigationMenu isOpen={isOpen} onClick={toggleMenu} />
      </Nav>
      <Separator />
    </header>
  );
}

export default Header;
