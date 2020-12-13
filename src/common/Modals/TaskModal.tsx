import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
  title: string;
  show: boolean;
  onHide: () => void;
  onConfirm: (value) => void;
  valueFromProps?: string;
};

const TaskModal: React.FC<Props> = ({ title, show, onConfirm, onHide, valueFromProps }) => {
  const [value, setValue] = useState(valueFromProps || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const onConfirmModal = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(value.trim());
    setValue('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="task-modal">
          <form onSubmit={onConfirmModal}>
            <input
              type="text"
              ref={inputRef}
              className="task-modal__input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Confirm
            </button>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
