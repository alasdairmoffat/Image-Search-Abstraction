import { TOGGLE_MODAL, UPDATE_MODAL_IMAGE } from '../actions/types';

const initialState = {
  modalOpen: false,
  modalImage: { src: '', alt: '' },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };

    case UPDATE_MODAL_IMAGE: {
      const { src, alt } = action;
      return {
        ...state,
        modalImage: {
          src,
          alt,
        },
      };
    }

    default:
      return state;
  }
};
