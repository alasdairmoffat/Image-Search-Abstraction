import axios from 'axios';
import { FETCH_SEARCH_HISTORY } from './types';

const formatTime = (timeString) => {
  const time = Math.floor((Date.now() - new Date(timeString)) / 1000);

  if (Math.floor(time / (60 * 60 * 24 * 7))) {
    const weeks = Math.floor(time / (60 * 60 * 24 * 7));
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  if (Math.floor(time / (60 * 60 * 24))) {
    const days = Math.floor(time / (60 * 60 * 24));
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (Math.floor(time / (60 * 60))) {
    const hours = Math.floor(time / (60 * 60));
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (Math.floor(time / 60)) {
    const mins = Math.floor(time / 60);
    return `${mins} min${mins > 1 ? 's' : ''} ago`;
  }
  return '<1 min ago';
};

const fetchSearchHistory = () => async (dispatch) => {
  try {
    const latest = await axios.get('/api/latest/imagesearch');
    const searchHistory = latest.data.map((x) => ({
      searchTerm: x.searchTerm,
      timeSince: formatTime(x.date),
    }));

    dispatch({
      type: FETCH_SEARCH_HISTORY,
      searchHistory,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export default fetchSearchHistory;
