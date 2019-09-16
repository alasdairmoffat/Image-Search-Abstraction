import axios from 'axios';

import {
  UPDATE_INPUT_TEXT,
  UPDATE_SEARCH_TERM,
  AWAITING_SEARCH_RESULTS,
  SEARCH_RESULTS_RECEIVED,
  RESET_IMAGES,
  ADD_IMAGES,
  UPDATE_NUM_PAGES,
  UPDATE_CURRENT_PAGE,
} from './types';

export const updateInputText = (inputText) => ({
  type: UPDATE_INPUT_TEXT,
  inputText,
});

export const updateSearchTerm = (searchTerm) => ({
  type: UPDATE_SEARCH_TERM,
  searchTerm,
});

export const awaitingSearchResults = (waiting) => (waiting
  ? { type: AWAITING_SEARCH_RESULTS }
  : { type: SEARCH_RESULTS_RECEIVED });

export const updateCurrentPage = (page) => ({
  type: UPDATE_CURRENT_PAGE,
  page,
});

export const updateNumPages = (numPages) => ({
  type: UPDATE_NUM_PAGES,
  numPages,
});

export const resetImages = () => ({
  type: RESET_IMAGES,
});

export const fetchImages = (searchTerm, page) => async (dispatch) => {
  if (page) {
    // This request will be for a preexisting searchTerm
    // newly pulled images stored in appropriate Index
    dispatch(awaitingSearchResults(true));
    dispatch(updateCurrentPage(page));
    try {
      const data = await axios.get(
        `/api/imagesearch/${encodeURI(searchTerm)}?offset=${page - 1}`,
      );

      dispatch({
        type: ADD_IMAGES,
        page,
        images: data.data.items,
      });

      dispatch(awaitingSearchResults(false));
    } catch (err) {
      console.log(err);
    }
  } else {
    // This request will be for a new searchTerm
    // images is reset with new results; currentPage and numPages updated.
    dispatch(resetImages());
    dispatch(awaitingSearchResults(true));
    dispatch(updateCurrentPage(1));
    try {
      const data = await axios.get(`/api/imagesearch/${encodeURI(searchTerm)}`);

      const { totalResults } = data.data;
      dispatch(updateNumPages(Math.min(Math.ceil(totalResults / 10), 10)));
      dispatch({
        type: ADD_IMAGES,
        page: 1,
        images: data.data.items,
      });
      dispatch(awaitingSearchResults(false));

      // add searched term to recent searches db
      try {
        await axios.post('/api/latest/imagesearch', {
          searchTerm,
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  }
};
