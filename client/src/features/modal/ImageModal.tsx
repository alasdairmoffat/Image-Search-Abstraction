import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal,
  ModalHeader,
  Carousel,
  CarouselItem,
  CarouselControl,
} from 'reactstrap';
import Interweave from 'interweave';
import { useAppSelector } from '../../app/hooks';
import { useGetImagesQuery } from '../api/apiSlice';
import { toggleModal, updateModalIndex } from './modalSlice';

const ImageModal = () => {
  const dispatch = useDispatch();

  const { searchTerm, page } = useAppSelector((state) => state.images);
  const { modalOpen, modalIndex } = useAppSelector((state) => state.modal);

  const { data: { items: images } = { items: [] } } = useGetImagesQuery({
    searchTerm,
    page,
  });

  if (!images.length) {
    return <></>; //
  }

  const modalTitle = images[modalIndex].title;

  const toggle = () => dispatch(toggleModal());

  const next = () => {
    if (modalIndex < images.length - 1) {
      dispatch(updateModalIndex(modalIndex + 1));
    }
  };
  const previous = () => {
    if (modalIndex > 0) {
      dispatch(updateModalIndex(modalIndex - 1));
    }
  };

  const carouselImages = images.map((image) => (
    <CarouselItem key={image.id}>
      <img
        src={image.src}
        alt={image.title}
        style={{ height: '100%', width: '100%', padding: '2%' }}
      />
    </CarouselItem>
  ));

  return (
    <Modal
      className="modal-lg modal-dialog-centered"
      isOpen={modalOpen}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>
        <Interweave content={modalTitle} />
      </ModalHeader>
      <Carousel
        interval={false}
        activeIndex={modalIndex}
        next={next}
        previous={previous}
      >
        {carouselImages}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </Modal>
  );
};

export default ImageModal;
