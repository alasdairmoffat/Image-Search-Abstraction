import React, { Fragment, useState } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';
import axios from 'axios';
import ImageCard from './ImageCard';
import AppPagination from './AppPagination';

const ImageSearch = () => {
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = e => {
    setInputText(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setSearchTerm(inputText);

    try {
      const data = await axios.get(`/api/imagesearch/${encodeURI(inputText)}`);
      setImages(data.data.items);
      const { totalResults } = data.data;
      setNumPages(Math.min(Math.ceil(totalResults / 10), 10));
    } catch (err) {
      console.log(err);
    }
  };

  const setPage = async newPage => {
    setCurrentPage(newPage);

    try {
      const data = await axios.get(
        `api/imagesearch/${encodeURI(searchTerm)}?offset=${newPage - 1}`,
      );
      setImages(data.data.items);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row className="mt-4 mb-4 justify-content-center">
        <Form inline onSubmit={onSubmit}>
          <FormGroup>
            <Input
              type="search"
              name="search"
              id="search"
              placeholder="Image Search"
              onChange={onChange}
            />
          </FormGroup>
          <Button>Search</Button>
        </Form>
      </Row>

      {images.length ? (
        <Fragment>
          <Row className="justify-content-center">
            <h4 className="text-light mb-4">
              Showing results for '{searchTerm}'
            </h4>
          </Row>

          <Row className="justify-content-center">
            <AppPagination
              currentPage={currentPage}
              numPages={numPages}
              setPage={setPage}
            />
          </Row>

          <Row className="mb-4 justify-content-center">
            {images.map((image, i) => (
              <Col key={`img${i}`} xs="12" sm="12" md="6" lg="6" xl="4">
                <ImageCard image={image} />
              </Col>
            ))}
          </Row>
        </Fragment>
      ) : null}
    </Container>
  );
};

export default ImageSearch;
