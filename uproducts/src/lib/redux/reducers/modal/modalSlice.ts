import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '@/lib/redux/createAppSlice';

export interface IModal {
  isOpen: boolean;
  componentProps: {
    title: string;
    text: string;
  };
}

export const initialState: IModal = {
  isOpen: false,
  componentProps: {
    title: '',
    text: '',
  },
};

export const modalSlice = createAppSlice({
  name: 'modal',
  initialState,
  reducers: (create) => ({
    openModal: create.reducer((state, action: PayloadAction<Omit<IModal, 'isOpen'>>): void => {
      state.isOpen = true;
      const props = action.payload.componentProps;
      if (props) {
        state.componentProps.title = props.title;
        state.componentProps.text = props.text;
      } else {
        state.isOpen = false;
      }
    }),
    closeModal: create.reducer((state): void => {
      state.isOpen = false;
      state.componentProps.title = '';
      state.componentProps.text = '';
    }),
  }),
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
