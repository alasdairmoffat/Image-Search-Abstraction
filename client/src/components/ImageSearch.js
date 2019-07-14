import React, { Fragment, useState } from 'react';
import { Container, Row } from 'reactstrap';
import axios from 'axios';
import AppPagination from './AppPagination';
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';

const ImageSearch = () => {
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Handler for text input
  const onChange = e => {
    setInputText(e.target.value);
  };

  // Handler for search form submission
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

  // Handler for pagination click
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
        <SearchForm onSubmit={onSubmit} onChange={onChange} />
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
            <SearchResults currentPage={currentPage} images={images} />
          </Row>
        </Fragment>
      ) : null}
    </Container>
  );
};

export default ImageSearch;
