import { motion } from 'framer-motion';
import SideMenuItem from '../sideMenuItem/SideMenuItem';
import { setFirstLetterUppercase } from '@/helpers/helpers';
import { SquareX } from 'lucide-react';
import { TypographyMuted } from '../typography/TypographyMuted';
import { animations } from '@/lib/animations/animations';

type CategoryEnums = 'drinks' | 'coffee' | 'oil' | 'chocolate' | 'products';

const categoryArr: CategoryEnums[] = ['drinks', 'coffee', 'oil', 'chocolate', 'products'];

function MobileNavigationMenu({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }): React.JSX.Element {
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={animations.menuVariants}
      className="fixed lg:hidden top-0 left-0 h-screen w-2/3 z-40 shadow-lg"
    >
      <div className="flex justify-around items-start p-4 my-5">
        <div className="flex flex-col justify-center items-start h-full w-full gap-4">
          <TypographyMuted text="Choose category:" className="font-semibold" />
          {categoryArr.map((el, i) => (
            <SideMenuItem
              key={`${i} + ${el}`}
              item={setFirstLetterUppercase(el)}
              toggleMenu={onClick}
              className={'font-normal text-sm text-grey-basic hover:text-orange'}
            />
          ))}
        </div>
        <button onClick={onClick} className="pointer">
          <SquareX className="text-black" />
        </button>
      </div>
    </motion.div>
  );
}

export default MobileNavigationMenu;
