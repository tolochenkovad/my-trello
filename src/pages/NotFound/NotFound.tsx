import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound: React.FC = () => {
  const history = useHistory();
  console.log(history.location.pathname, 'history.location.pathname');
  return <div>Not Found!!</div>;
};

export default NotFound;
