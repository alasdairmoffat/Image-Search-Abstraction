import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';
import Interweave from 'interweave';

const ImageCard = ({ image, imageClick }) => {
  const { title, htmlTitle, htmlSnippet, link, src } = image;

  return (
    <Fragment>
      <Card className="mb-2">
        <CardImg top width="100%" src={src} onClick={imageClick} alt={title} />
        <CardBody>
          <CardTitle>
            <h4>
              <Interweave content={htmlTitle} />
            </h4>
          </CardTitle>
          <CardText className="mb-3">
            <Interweave content={htmlSnippet} />
          </CardText>
          <a href={link} target="_blank" rel="noreferrer noopener">
            <Button>View Source</Button>
          </a>
        </CardBody>
      </Card>
    </Fragment>
  );
};

ImageCard.propTypes = {
  image: PropTypes.shape({
      title: PropTypes.string.isRequired,
      htmlTitle: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      snippet: PropTypes.string,
      htmlSnippet: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
  imageClick: PropTypes.func.isRequired,
};

export default ImageCard;
