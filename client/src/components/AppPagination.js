import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { updateCurrentPage, fetchImages } from '../store/actions/imagesActions';

const AppPagination = () => {
  const currentPage = useSelector((state) => state.images.currentPage);
  const numPages = useSelector((state) => state.images.numPages);
  const images = useSelector((state) => state.images.images);
  const searchTerm = useSelector((state) => state.images.searchTerm);

  const dispatch = useDispatch();

  const setPage = (page) => {
    if (images[page - 1]) {
      // This page is already in state
      dispatch(updateCurrentPage(page));
    } else {
      // This page needs to be fetched
      dispatch(fetchImages(searchTerm, page));
    }
  };

  const pages = Array.from(new Array(numPages), (x, i) => i + 1);

  const onClick = (e, page) => {
    e.preventDefault();

    // We only call setPage if page is a valid number
    if (page >= 1 && page <= numPages) {
      setPage(page);
    }
  };

  return (
    <>
      <Pagination>
        <PaginationItem
          key="previous"
          disabled={currentPage === 1}
          onClick={(e) => onClick(e, currentPage - 1)}
        >
          <PaginationLink previous href="#" />
        </PaginationItem>
        {pages.map((x) => (
          <PaginationItem
            key={x}
            active={x === currentPage}
            onClick={(e) => onClick(e, x)}
          >
            <PaginationLink href="#">{x}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem
          key="next"
          disabled={currentPage === numPages}
          onClick={(e) => onClick(e, currentPage + 1)}
        >
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default AppPagination;
