import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
  show: boolean;
  onHide: () => void;
};

const ConfirmModal: React.FC<Props> = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
    <Modal.Body>
      <div className="text-center">Are you sure?</div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onHide}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;
