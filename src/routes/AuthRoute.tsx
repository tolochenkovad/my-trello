import React, { FC, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from './constants';

type Props = {
  component: React.FC;
};

const AuthRoute: FC<Props & RouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      history.push(ROUTES.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, history]);

  if (!isAuthenticated) {
    return <Spinner />;
  } else {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
};

export default AuthRoute;
