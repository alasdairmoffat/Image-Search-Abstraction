import Interweave from 'interweave';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from 'reactstrap';
import { Image } from '../../types';
import { toggleModal, updateModalIndex } from '../modal/modalSlice';

interface Props {
  image: Image;
  index: number;
}

const ImageCard = ({ image, index }: Props) => {
  const dispatch = useDispatch();
  const { title, htmlTitle, htmlSnippet, link, src } = image;

  const imageClick = () => {
    dispatch(updateModalIndex(index));
    dispatch(toggleModal());
  };

  return (
    <>
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
    </>
  );
};

export default ImageCard;
