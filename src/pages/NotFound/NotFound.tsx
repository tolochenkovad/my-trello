import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="not-found">
    <div>Oops, Page Not Found :(</div>
    <Link to="/">Go to main page</Link>
  </div>
);

export default NotFound;
