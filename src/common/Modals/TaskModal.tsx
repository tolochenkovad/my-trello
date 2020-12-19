import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Buttons from './Buttons';

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
    sendValue();
  };

  const sendValue = () => {
    onConfirm(value.trim());
    setValue('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton className="no-border">
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
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer className="no-border">
        <Buttons onHide={onHide} onConfirm={sendValue} />
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
