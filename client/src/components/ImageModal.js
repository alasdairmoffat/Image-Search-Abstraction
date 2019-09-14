import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Card } from 'reactstrap';
import { toggleModal } from '../store/actions/modalActions';

const ImageModal = () => {
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const modalImage = useSelector((state) => state.modal.modalImage);

  const dispatch = useDispatch();

  const toggle = () => dispatch(toggleModal());

  return (
    <Modal
      className="modal-lg modal-dialog-centered"
      isOpen={modalOpen}
      toggle={toggle}
      onClick={toggle}
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
  );
};

export default ImageModal;
