import Image from 'next/image';
import { NavLink } from '@/components/NavLink/Nav';
import Logo from '../../../public/assets/Logo_Uproducts.svg';

const LogoComponent = () => {
  return (
    <NavLink href="/">
      <div className="relative w-20 h-7 md:w-24">
        <Image src={Logo} alt="logo" fill className="object-cover" />
      </div>
    </NavLink>
  );
};

export default LogoComponent;
