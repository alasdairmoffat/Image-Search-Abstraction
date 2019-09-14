import axios from 'axios';

import {
  UPDATE_INPUT_TEXT,
  UPDATE_SEARCH_TERM,
  REPLACE_IMAGES,
  ADD_IMAGES,
  UPDATE_NUM_PAGES,
  UPDATE_CURRENT_PAGE,
} from './types';

export const updateInputText = (inputText) => ({
  type: UPDATE_INPUT_TEXT,
  inputText,
});

export const updateCurrentPage = (page) => ({
  type: UPDATE_CURRENT_PAGE,
  page,
});

export const updateNumPages = (numPages) => ({
  type: UPDATE_NUM_PAGES,
  numPages,
});

export const updateSearchTerm = (searchTerm) => ({
  type: UPDATE_SEARCH_TERM,
  searchTerm,
});

export const fetchImages = (searchTerm, page) => async (dispatch) => {
  const url = page
    ? `/api/imagesearch/${encodeURI(searchTerm)}?offset=${page - 1}`
    : `/api/imagesearch/${encodeURI(searchTerm)}`;

  try {
    const data = await axios.get(url);

    if (page) {
      // This request will be for a preexisting searchTerm
      // newly pulled images stored in appropriate Index
      dispatch({
        type: ADD_IMAGES,
        page,
        images: data.data.items,
      });
      dispatch(updateCurrentPage(page));
    } else {
      // This request will be for a new searchTerm
      // images is reset with new results; currentPage and numPages updated.
      dispatch(updateCurrentPage(1));

      const { totalResults } = data.data;
      dispatch(updateNumPages(Math.min(Math.ceil(totalResults / 10), 10)));

      dispatch({
        type: REPLACE_IMAGES,
        images: data.data.items,
      });

      // add searched term to recent searches db
      try {
        await axios.post('/api/latest/imagesearch', {
          searchTerm,
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
