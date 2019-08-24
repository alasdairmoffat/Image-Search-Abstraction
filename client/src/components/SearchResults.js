import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import ImageCard from './ImageCard';

const SearchResults = ({ images, imageClick }) => (
  <Fragment>
    {images.map((image, i) => (
      <Col key={`img${i}`} xs="12" sm="12" md="6" lg="6" xl="4">
        <ImageCard image={image} imageClick={imageClick} />
      </Col>
    ))}
  </Fragment>
);

SearchResults.propTypes = {
  images: PropTypes.array.isRequired,
  imageClick: PropTypes.func.isRequired,
};

export default SearchResults;
