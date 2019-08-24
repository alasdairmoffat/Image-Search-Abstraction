import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const AppPagination = ({currentPage, numPages, setPage}) => {

  const pages = Array.from(new Array(numPages), (x, i) => i + 1);

  const onClick = (e, page) => {
    e.preventDefault();

    // We only call setPage if page is a valid number
    if (page >= 1 && page <= numPages) {
      setPage(page);
    }
  };

  return (
    <Fragment>
      <Pagination>
        <PaginationItem
          key="previous"
          disabled={currentPage === 1}
          onClick={e => onClick(e, currentPage - 1)}
        >
          <PaginationLink previous href="#" />
        </PaginationItem>
        {pages.map(x => (
          <PaginationItem
            key={x}
            active={x === currentPage}
            onClick={e => onClick(e, x)}
          >
            <PaginationLink href="#">{x}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem
          key="next"
          disabled={currentPage === numPages}
          onClick={e => onClick(e, currentPage + 1)}
        >
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    </Fragment>
  );
};

AppPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default AppPagination;
