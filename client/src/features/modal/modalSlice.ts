import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  modalOpen: boolean;
  modalIndex: number;
}

const initialState: ModalState = {
  modalOpen: false,
  modalIndex: 0,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal(state) {
      state.modalOpen = !state.modalOpen;
    },
    updateModalIndex(state, action: PayloadAction<number>) {
      state.modalIndex = action.payload;
    },
  },
});

export const { toggleModal, updateModalIndex } = modalSlice.actions;
export default modalSlice.reducer;
