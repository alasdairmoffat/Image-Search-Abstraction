import { combineReducers } from 'redux';
import imagesReducer from './imagesReducer';
import modalReducer from './modalReducer';
import searchHistoryReducer from './searchHistoryReducer';

export default combineReducers({
  images: imagesReducer,
  modal: modalReducer,
  searchHistory: searchHistoryReducer,
});
