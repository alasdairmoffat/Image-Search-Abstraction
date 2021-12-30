import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import imagesSlice from '../features/images/imagesSlice';
import modalSlice from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    images: imagesSlice,
    modal: modalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
