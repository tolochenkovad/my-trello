import React from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../store/Authorization/selectors';
import { isEmpty } from 'react-redux-firebase';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = {
  component: React.FC;
};

const AuthRoute: React.FC<Props & RouteProps> = ({ component: Component, ...rest }) => {
  const auth = useSelector(getAuth);
  if (isEmpty(auth)) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
};

export default AuthRoute;
