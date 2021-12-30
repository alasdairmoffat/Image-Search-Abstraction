import { createSlice } from '@reduxjs/toolkit';

interface ImagesState {
  searchTerm: string;
  page: number;
  totalResults: number;
}

const initialState: ImagesState = {
  searchTerm: '',
  page: 1,
  totalResults: 0,
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    updateSearchTerm: (state, action) => {
      state.page = 1;
      state.totalResults = 0;
      state.searchTerm = action.payload;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    updateTotalResults: (state, action) => {
      state.totalResults = action.payload;
    },
  },
});

export const { updateSearchTerm, updatePage, updateTotalResults } =
  imagesSlice.actions;
export default imagesSlice.reducer;
