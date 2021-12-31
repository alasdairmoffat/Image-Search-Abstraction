import { nanoid } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ImagesState,
  SearchHistory,
  SearchHistoryResponse,
  ImageResponse,
} from '../../types';
import { updateTotalResults } from '../images/imagesSlice';
import formatTime from '../../utils/formatTime';

interface AddHistoryArgs {
  searchTerm: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['History'],
  endpoints: (builder) => ({
    getSearchHistory: builder.query<SearchHistory[], void>({
      query: () => '/latest/imagesearch',
      transformResponse: (rawResponse: SearchHistoryResponse[]) =>
        rawResponse.map((item) => {
          const id = nanoid();
          const { searchTerm, date } = item;
          return {
            id,
            searchTerm,
            timeSince: formatTime(date),
          };
        }),
      providesTags: ['History'],
    }),

    addSearchHistory: builder.mutation<void, AddHistoryArgs>({
      query: ({ searchTerm }) => ({
        url: 'latest/imagesearch',
        method: 'POST',
        body: { searchTerm },
      }),
      invalidatesTags: ['History'],
    }),

    getImages: builder.query<
      ImagesState,
      { searchTerm: string; page?: number }
    >({
      query: ({ searchTerm, page }) => {
        let url = `/imagesearch/${encodeURI(searchTerm)}`;
        if (page && page > 1) url += `?offset=${page - 1}`;

        return url;
      },
      transformResponse: (
        rawResponse: ImageResponse,
        meta,
        { searchTerm },
      ) => ({
        ...rawResponse,
        items: rawResponse.items.map((item) => ({ ...item, id: nanoid() })),
        searchTerm,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(updateTotalResults(data.totalResults));
      },
    }),
  }),
});

export const {
  useGetSearchHistoryQuery,
  useAddSearchHistoryMutation,
  useGetImagesQuery,
  useLazyGetImagesQuery,
} = apiSlice;
