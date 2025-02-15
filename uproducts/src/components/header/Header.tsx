'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Nav } from '@/components/NavLink/Nav';
import { Separator } from '@/components/ui/separator';
import MobileNavigationMenu from '../mobileNavigationMenu/MobileNavigationMenu';
import NavigationMenu from '../navigationMenu/NavigationMenu';
import { useGetUserQuery, useLogoutMutation } from '@/lib/redux/apiSlice/apiSlice';
import LogoComponent from './LogoComponent';
import AuthButtons from './AuthButtons';
import HeaderSearch from './HeaderSearch';
import { api } from '@/lib/redux/apiSlice/apiSlice';
import { useAppDispatch } from '@/hooks/hooks';
import { useRouter } from 'next/navigation';

function Header({ profile = false }: { profile?: boolean }): React.JSX.Element {
  const pathname = useRouter();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data } = useGetUserQuery();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = useCallback((): void => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(api.util.invalidateTags([{ type: 'User' }]));
      dispatch(api.util.resetApiState());
      if (profile) {
        pathname.push('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
          <AuthButtons user={data?.data ?? null} handleLogout={handleLogout} profile={profile} />
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
