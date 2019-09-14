import { FETCH_SEARCH_HISTORY } from '../actions/types';

const initialState = {
  searchHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: action.searchHistory,
      };

    default:
      return state;
  }
};
