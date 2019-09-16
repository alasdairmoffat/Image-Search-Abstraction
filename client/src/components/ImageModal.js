import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  ModalHeader,
  Carousel,
  CarouselItem,
  CarouselControl,
} from 'reactstrap';
import Interweave from 'interweave';

import { toggleModal, updateModalIndex } from '../store/actions/modalActions';

const ImageModal = () => {
  const currentPage = useSelector((state) => state.images.currentPage);
  const images = useSelector((state) => state.images.images);

  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const modalIndex = useSelector((state) => state.modal.modalIndex);

  const dispatch = useDispatch();

  const currentImages = images[currentPage - 1];

  if (!currentImages) {
    return (<></>);
  }

  const modalTitle = currentImages[modalIndex].title;

  const toggle = () => dispatch(toggleModal());

  const next = () => {
    if (modalIndex < currentImages.length - 1) {
      dispatch(updateModalIndex(modalIndex + 1));
    }
  };
  const previous = () => {
    if (modalIndex > 0) {
      dispatch(updateModalIndex(modalIndex - 1));
    }
  };

  const carouselImages = currentImages.map((image, i) => (
    <CarouselItem key={i}>
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
      <Carousel interval={false} activeIndex={modalIndex} next={next} previous={previous}>
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
