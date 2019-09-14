import { TOGGLE_MODAL, UPDATE_MODAL_INDEX } from './types';

export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});

export const updateModalIndex = (modalIndex) => ({
  type: UPDATE_MODAL_INDEX,
  modalIndex,
});
