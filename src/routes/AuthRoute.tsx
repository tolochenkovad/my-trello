import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../store/Authorization/selectors';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { Route, RouteProps } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ROUTES } from './constants';

type Props = {
  component: React.FC;
};

const AuthRoute: FC<Props & RouteProps> = ({ component: Component, ...rest }) => {
  const auth = useSelector(getAuth);
  const history = useHistory();

  useEffect(() => {
   if (isEmpty(auth) && isLoaded((auth))) {
     history.push(ROUTES.LOGIN);
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
