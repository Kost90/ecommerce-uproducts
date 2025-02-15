import { motion } from 'framer-motion';
import SideMenuItem from '../sideMenuItem/SideMenuItem';
import { setFirstLetterUppercase } from '@/helpers/helpers';
import { SquareX } from 'lucide-react';
import { TypographyMuted } from '../typography/TypographyMuted';
import { animations } from '@/lib/animations/animations';
import { usersRolesList } from '@/constans/userRolesLists';
import { IUserResponse } from '@/types/userTypes';
import AdminNavigationMenu from '../adminNavigationMenu/AdminNavigationMenu';
import LogoComponent from '../header/LogoComponent';

interface ICpomponentProps {
  isOpen: boolean;
  onClick: () => void;
  user: IUserResponse | null;
}
type CategoryEnums = 'drinks' | 'coffee' | 'oil' | 'chocolate' | 'products';

const categoryArr: CategoryEnums[] = ['drinks', 'coffee', 'oil', 'chocolate', 'products'];

function MobileNavigationMenu({ isOpen, onClick, user }: ICpomponentProps): React.JSX.Element {
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={animations.menuVariants}
      className="fixed lg:hidden top-0 left-0 h-screen w-2/3 z-40 shadow-lg bg-[#fbf8f8]"
    >
      <div className="flex flex-col items-start p-4 my-5">
        <div className="flex justify-between w-full">
          <LogoComponent />
          <button onClick={onClick} className="pointer">
            <SquareX className="text-black" />
          </button>
        </div>

        <div className="flex flex-col justify-center items-start h-full w-full gap-4">
          {user && user.role === usersRolesList.admin && (
            <>
              <TypographyMuted text="Navigation in your profile:" className="font-semibold mt-5" />
              <AdminNavigationMenu className="items-start gap-4" toggleMenu={onClick} />
            </>
          )}

          <TypographyMuted text="Choose category:" className={`font-semibold ${user && user.role !== usersRolesList.admin && 'mt-5'}`} />
          {categoryArr.map((el, i) => (
            <SideMenuItem
              key={`${i} + ${el}`}
              item={setFirstLetterUppercase(el)}
              toggleMenu={onClick}
              className={'font-normal text-sm text-grey-basic hover:text-orange'}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default MobileNavigationMenu;
