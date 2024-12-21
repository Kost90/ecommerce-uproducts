'use client';
import TypographyH3 from '../typography/TyphographyH3';
import { SquareX, CircleCheckBig } from 'lucide-react';
import { TypographyLead } from '../typography/TypographyLead';
import { useAppSelector } from '@/hooks/hooks';
import { selectModalProps } from '@/lib/redux/selectors/modalSelectors';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/lib/redux/reducers/modal/modalSlice';

function Modal(): React.JSX.Element | null {
  const dispatch = useDispatch();
  const { isOpen, componentProps } = useAppSelector(selectModalProps);
  const handelClick = (): void => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed m-auto w-full h-screen bg-gray-500/75 transition-opacity top-0 left-0">
      <div className="flex flex-col justify-center items-center md:w-1/2 min-h-60 w-3/4 text-center mx-auto md:min-h-96 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-sm p-4 gap-4">
        <button type="button" onClick={handelClick}>
          <SquareX className="absolute top-2 right-2" />
        </button>
        <CircleCheckBig className="text-green-300 w-12 h-12" />
        <TypographyH3 text={componentProps.title} />
        <TypographyLead text={componentProps.text} />
      </div>
    </div>
  );
}

export default Modal;
