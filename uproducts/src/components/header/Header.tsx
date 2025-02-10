'use client';
import React, { useEffect, useState } from 'react';
import { Nav } from '@/components/NavLink/Nav';
import { Separator } from '@/components/ui/separator';
import MobileNavigationMenu from '../mobileNavigationMenu/MobileNavigationMenu';
import NavigationMenu from '../navigationMenu/NavigationMenu';
import useUser from '@/hooks/useUser';
import LogoComponent from './LogoComponent';
import AuthButtons from './AuthButtons';
import HeaderSearch from './HeaderSearch';
import AuthorizationService from '@/api/services/authorizationServices/AuthorizationService';

function Header(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, loading } = useUser();

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    AuthorizationService.signOut();
    console.log('Logging out...');
    //TODO:Make logout function in redux
  };

  return (
    <header
      className={`container lg:max-w-full fixed top-0 z-50 transition-all right-0 left-0 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-inherit'
      }`}
    >
      <Nav className="flex flex-col mt-2 sm:mb-1 gap-2">
        <div className="flex justify-between items-center">
          <LogoComponent />
          {!loading && <AuthButtons user={user} handleLogout={handleLogout} />}
        </div>
        <Separator className="bg-olive" />
        <div className="flex justify-between items-center gap-2 md:min-w-72">
          <NavigationMenu />
          <HeaderSearch isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
        <MobileNavigationMenu isOpen={isOpen} onClick={toggleMenu} />
      </Nav>
    </header>
  );
}

export default Header;
