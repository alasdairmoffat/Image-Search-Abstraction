import { TOGGLE_MODAL, UPDATE_MODAL_IMAGE } from './types';

export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});

export const updateModalImage = (src, alt) => ({
  type: UPDATE_MODAL_IMAGE,
  src,
  alt,
});
