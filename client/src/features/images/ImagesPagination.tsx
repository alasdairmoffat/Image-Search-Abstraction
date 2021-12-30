import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useAppSelector } from '../../app/hooks';
import { updatePage } from './imagesSlice';

const ImagesPagination = () => {
  const dispatch = useDispatch();

  const { page } = useAppSelector((state) => state.images);

  const totalResults = useAppSelector((state) => state.images.totalResults);
  // We want a maximum of 10 pages
  const numPages = Math.min(Math.ceil(totalResults / 10), 10);

  const setPage = (newPage: number) => {
    dispatch(updatePage(newPage));
  };

  const pages = Array.from(new Array(numPages), (x, i) => i + 1);

  const onClick = (e: MouseEvent, newPage: number) => {
    e.preventDefault();

    // We only call setPage if page is a valid number
    if (newPage >= 1 && newPage <= numPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      {numPages > 1 && (
        <Pagination>
          <PaginationItem
            key="previous"
            disabled={page === 1}
            onClick={(e) => onClick(e, page - 1)}
          >
            <PaginationLink previous href="#" />
          </PaginationItem>
          {pages.map((x) => (
            <PaginationItem
              key={x}
              active={x === page}
              onClick={(e) => onClick(e, x)}
            >
              <PaginationLink href="#">{x}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            key="next"
            disabled={page === numPages}
            onClick={(e) => onClick(e, page + 1)}
          >
            <PaginationLink next href="#" />
          </PaginationItem>
        </Pagination>
      )}
    </>
  );
};

export default ImagesPagination;
