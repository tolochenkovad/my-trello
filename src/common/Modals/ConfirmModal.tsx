import React, { FC } from 'react';
import { Modal } from 'react-bootstrap';
import Buttons from './Buttons';

type Props = {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
};

const ConfirmModal: FC<Props> = ({ show, onHide, onConfirm }) => (
  <Modal show={show} onHide={onHide} backdrop="static">
    <Modal.Body>
      <div className="text-center font-size-20">Are you sure?</div>
    </Modal.Body>
    <Modal.Footer className="no-border">
      <Buttons onHide={onHide} onConfirm={onConfirm} />
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;
