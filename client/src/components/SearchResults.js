import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';

import ImageCard from './ImageCard';

const SearchResults = () => {
  const currentPage = useSelector((state) => state.images.currentPage);
  const images = useSelector((state) => state.images.images);

  return (
    <>
      {images[currentPage - 1].map((image, i) => (
        <Col key={`img${i}`} xs="12" sm="12" md="6" lg="6" xl="4">
          <ImageCard image={image} />
        </Col>
      ))}
    </>
  );
};

export default SearchResults;
