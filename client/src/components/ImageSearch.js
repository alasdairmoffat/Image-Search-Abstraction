import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Spinner } from 'reactstrap';

import AppPagination from './AppPagination';
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';
import LatestSearches from './LatestSearches';
import ImageModal from './ImageModal';

import fetchSearchHistory from '../store/actions/searchHistoryActions';

const ImageSearch = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.images.searchTerm);
  const images = useSelector((state) => state.images.images);
  const waiting = useSelector((state) => state.images.awaitingSearchResults);

  // api call to fetch most recent search data made whenever component re-renders
  useEffect(() => {
    dispatch(fetchSearchHistory());
  });

  return (
    <Container>
      <Row className="mt-4 mb-4 justify-content-center">
        <SearchForm />
      </Row>

      <LatestSearches />

      {images.length ? (
        <>
          <Row className="justify-content-center">
            <h4 className="text-light mb-4">
              Showing results for &apos;
              {searchTerm}
              &apos;
            </h4>
          </Row>

          <Row className="justify-content-center">
            <AppPagination />
          </Row>
        </>
      ) : null}

      {waiting ? (
        <Spinner
          color="light"
          className="mt-4"
          style={{ width: '5rem', height: '5rem' }}
        />
      ) : null}

      {images.length ? (
        <>
          <ImageModal />

          <Row className="mb-4 justify-content-center">
            <SearchResults />
          </Row>
        </>
      ) : null}
    </Container>
  );
};

export default ImageSearch;
