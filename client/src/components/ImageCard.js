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

const ImageCard = props => {
  const { title, snippet, link, src } = props.image;

  return (
    <Fragment>
      <Card className="mb-2">
        <a href={src} target="blank" rel="noreferrer noopener">
          <CardImg top width="100%" src={src} />
        </a>
        <CardBody>
          <CardTitle>
            <h5>{title}</h5>
          </CardTitle>
          <CardText className="mb-3">{snippet}</CardText>
          <a href={link} target="_blank" rel="noreferrer noopener">
            <Button>View Source</Button>
          </a>
        </CardBody>
      </Card>
    </Fragment>
  );
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
};

export default ImageCard;
