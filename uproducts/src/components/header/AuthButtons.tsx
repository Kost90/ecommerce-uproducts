import Image from 'next/image';
import { NavLink } from '@/components/NavLink/Nav';
import SignInIcon from '../../../public/assets/sign_in_icon.svg';
import { IUserResponse } from '@/types/userTypes';
import AdminNavigationMenu from '../adminNavigationMenu/AdminNavigationMenu';
import { usersRolesList } from '@/constans/userRolesLists';

interface AuthButtonsProps {
  user: IUserResponse | null;
  handleLogout: () => void;
  profile?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ user, handleLogout, profile = false }) => {
  return (
    <div className="flex justify-center items-center gap-1">
      {user ? (
        <>
          {user.role === usersRolesList.admin && profile && <AdminNavigationMenu className="hidden" />}
          {profile ? (
            <NavLink href="/" className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange">
              Client side
            </NavLink>
          ) : (
            <NavLink href="/profile" className="flex items-center gap-1 hover:text-orange">
              <span className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange">Profile</span>
            </NavLink>
          )}
          <button onClick={handleLogout} className="text-xs md:text-sm font-normal text-grey-basic hover:text-orange">
            Logout
          </button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default AuthButtons;
