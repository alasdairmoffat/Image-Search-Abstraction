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
  images: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      htmlTitle: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      snippet: PropTypes.string,
      htmlSnippet: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
  imageClick: PropTypes.func.isRequired,
};

export default SearchResults;
