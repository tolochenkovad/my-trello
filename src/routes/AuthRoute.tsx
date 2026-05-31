import { ComponentType, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AppSpinner } from '@/shared/ui';
import { useAuth } from '@/shared/hooks';
import { ROUTES } from './constants';

type AuthRouteProps = {
  component: ComponentType;
} & RouteProps;

export const AuthRoute = ({ component: Component, ...rest }: AuthRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      history.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, history, loading]);

  if (!isAuthenticated) {
    return <AppSpinner />;
  } else {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
};
