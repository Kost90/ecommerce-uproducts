import { RootState } from '@/lib/redux/store';
import { IModal } from '../reducers/modal/modalSlice';

export const selectModalProps = (state: RootState): IModal => {
  return state.modal;
};
