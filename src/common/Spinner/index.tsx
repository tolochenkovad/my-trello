import React, { FC } from 'react';
import { Spinner as SpinnerBootstrap } from 'react-bootstrap';

const Spinner: FC = () => (
    <div className="text-center">
      <SpinnerBootstrap animation="border" role="status" />
    </div>
  );

export default Spinner;