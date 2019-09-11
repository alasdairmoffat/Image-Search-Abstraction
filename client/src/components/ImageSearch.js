import React, { Fragment, useState } from 'react';
import { Container, Row, Modal, Card } from 'reactstrap';
import axios from 'axios';
import AppPagination from './AppPagination';
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';
import LatestSearches from './LatestSearches';

const ImageSearch = () => {
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [images, setImages] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ src: '', alt: '' });

  // Handler for text input
  const onChange = e => {
    setInputText(e.target.value);
  };

  // Send request to server for images
  const requestImages = async (search, page) => {
    const url = page
      ? `/api/imagesearch/${encodeURI(search)}?offset=${page - 1}`
      : `/api/imagesearch/${encodeURI(search)}`;

    try {
      const data = await axios.get(url);

      if (page) {
        // This request will be for a preexisting searchTerm
        // newly pulled images stored in appropriate index
        const newImages = [...images];
        newImages[page - 1] = data.data.items;
        setImages(newImages);
      } else {
        // This request will be for a new searchTerm
        // images is reset to new term and currentPage reset
        setCurrentPage(1);
        setImages([data.data.items]);

        const { totalResults } = data.data;

        return { totalResults };
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postSearchTerm = async searchTerm => {
    try {
      await axios.post(`/api/latest/imagesearch`, { searchTerm });
    } catch (err) {
      console.log(err);
    }
  };

  // method to send image search request
  const newSearch = async newSearchTerm => {
    setSearchTerm(newSearchTerm);

    // add searched term to recent searches db
    postSearchTerm(newSearchTerm);

    const data = await requestImages(newSearchTerm);
    const { totalResults } = data;

    setNumPages(Math.min(Math.ceil(totalResults / 10), 10));
  };

  // Handler for search form submission
  const onSubmit = e => {
    e.preventDefault();
    newSearch(inputText);
  };

  // Handler for pagination click
  const setPage = async newPage => {
    // If we have already pulled this image search we just need to update currentPage
    if (images[newPage - 1]) {
      setCurrentPage(newPage);
      return;
    }

    // Otherwise we need to create a new entry in images for the newPage
    const newImages = [...images];
    newImages[newPage - 1] = [];
    setImages(newImages);
    // currentPage updated now to allow Pagination to respond to click
    setCurrentPage(newPage);
    requestImages(searchTerm, newPage);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const imageClick = e => {
    const { src, alt } = e.target;
    setModalImage({ src, alt });
    toggleModal();
  };

  const recentSearchClick = async newSearchTerm => {
    setInputText(newSearchTerm);
    newSearch(newSearchTerm);
  };

  return (
    <Container>
      <Row className="mt-4 mb-4 justify-content-center">
        <SearchForm
          inputText={inputText}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </Row>

      <LatestSearches onClick={recentSearchClick} />

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

          <Modal
            className="modal-lg modal-dialog-centered"
            isOpen={modalOpen}
            toggle={toggleModal}
            onClick={toggleModal}
          >
            <Card>
              <img
                className="modal-image"
                src={modalImage.src}
                alt={modalImage.alt}
                style={{ height: '100%', width: '100%', padding: '2%' }}
              />
            </Card>
          </Modal>

          <Row className="mb-4 justify-content-center">
            <SearchResults
              images={images[currentPage - 1]}
              imageClick={imageClick}
            />
          </Row>
        </Fragment>
      ) : null}
    </Container>
  );
};

export default ImageSearch;
