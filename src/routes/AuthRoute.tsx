import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../store/Authorization/selectors';
import { isEmpty } from 'react-redux-firebase';
import { Route, RouteProps } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

type Props = {
  component: React.FC;
};

const AuthRoute: React.FC<Props & RouteProps> = ({ component: Component, ...rest }) => {
  console.log('render AuthRoute')
  const auth = useSelector(getAuth);
  const history = useHistory();

  useEffect(() => {
    if (isEmpty(auth)) {
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    }
  }, [auth, history]);

  if (isEmpty(auth)) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  } else {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
};

export default AuthRoute;
