import React from 'react';
import { Separator } from '../ui/separator';
import SideMenuItem from '../sideMenuItem/SideMenuItem';
import { setFirstLetterUppercase } from '@/helpers/helpers';
import HoverWrapper from '../hover/HoverWrapper';

type CategoryEnums = 'drinks' | 'coffee' | 'oil' | 'chocolate' | 'products';

const categoryArr: CategoryEnums[] = ['drinks', 'coffee', 'oil', 'chocolate', 'products'];

function SideMenu(): React.JSX.Element {
  return (
    <div className="hidden md:block h-screen-minus-header w-[20%]">
      <div className="flex justify-between items-start h-full w-full">
        <div className="flex flex-col w-full justify-center items-start p-10 gap-10">
          {categoryArr.map((el, i) => (
            <HoverWrapper key={`${i} + ${el}`} className="w-28 px-4 py-2">
              <SideMenuItem item={setFirstLetterUppercase(el)} className={'font-bold'} />
            </HoverWrapper>
          ))}
        </div>
        <Separator orientation="vertical" />
      </div>
    </div>
  );
}

export default SideMenu;
