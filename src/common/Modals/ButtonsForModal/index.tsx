import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  onHide: () => void;
  onConfirm: () => void;
};

const Buttons: FC<Props> = ({ onHide, onConfirm }) => (
  <>
    <Button variant="secondary" className="small-btn" onClick={onHide}>
      Cancel
    </Button>
    <Button variant="primary" className="small-btn" onClick={onConfirm}>
      Confirm
    </Button>
  </>
);

export default Buttons;
