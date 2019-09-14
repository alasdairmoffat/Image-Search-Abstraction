import {
  TOGGLE_MODAL,
  UPDATE_MODAL_INDEX,
} from '../actions/types';

const initialState = {
  modalOpen: false,
  modalImage: { src: '', alt: '' },
  modalIndex: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };

    case UPDATE_MODAL_INDEX:
      return {
        ...state,
        modalIndex: action.modalIndex,
      };

    default:
      return state;
  }
};
