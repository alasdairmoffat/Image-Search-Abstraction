import {
  UPDATE_INPUT_TEXT,
  UPDATE_SEARCH_TERM,
  AWAITING_SEARCH_RESULTS,
  SEARCH_RESULTS_RECEIVED,
  RESET_IMAGES,
  ADD_IMAGES,
  UPDATE_NUM_PAGES,
  UPDATE_CURRENT_PAGE,
} from '../actions/types';

const initialState = {
  inputText: '',
  searchTerm: '',
  awaitingSearchResults: false,
  images: [],
  numPages: 0,
  currentPage: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INPUT_TEXT:
      return {
        ...state,
        inputText: action.inputText,
      };

    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    case AWAITING_SEARCH_RESULTS:
      return {
        ...state,
        awaitingSearchResults: true,
      };

    case SEARCH_RESULTS_RECEIVED:
      return {
        ...state,
        awaitingSearchResults: false,
      };

    case RESET_IMAGES:
      return {
        ...state,
        images: [],
      };

    case ADD_IMAGES: {
      const { images } = state;
      images[action.page - 1] = action.images;
      return {
        ...state,
        images,
      };
    }

    case UPDATE_NUM_PAGES:
      return {
        ...state,
        numPages: action.numPages,
      };

    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };

    default:
      return state;
  }
};
