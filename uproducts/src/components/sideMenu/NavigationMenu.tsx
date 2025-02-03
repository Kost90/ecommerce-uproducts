import React from 'react';
import SideMenuItem from '../sideMenuItem/SideMenuItem';
import { setFirstLetterUppercase } from '@/helpers/helpers';

type CategoryEnums = 'drinks' | 'coffee' | 'oil' | 'chocolate' | 'products';

const categoryArr: CategoryEnums[] = ['drinks', 'coffee', 'oil', 'chocolate', 'products'];

function NavigationMenu(): React.JSX.Element {
  return (
    <div className="hidden md:flex justify-center items-center h-6 w-full my-2">
      <div className="flex w-full justify-center items-center gap-5">
        {categoryArr.map((el, i) => (
          <SideMenuItem
            key={`${i} + ${el}`}
            item={setFirstLetterUppercase(el)}
            className={'font-normal text-sm text-black hover:text-orange'}
          />
        ))}
      </div>
    </div>
  );
}

export default NavigationMenu;
