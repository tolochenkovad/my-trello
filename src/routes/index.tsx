import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../pages/Main';
import Authorization from '../pages/Authorization';
import NotFound from '../pages/NotFound';
import AuthRoute from './AuthRoute';
import Analytics from '../pages/Analytics';
import { ROUTES } from './constants';

const Routes: FC = () => (
  <div className="main-container">
    <Switch>
      <AuthRoute exact path={ROUTES.MAIN} component={Main} />
      <Route path={ROUTES.LOGIN} component={Authorization} />
      <AuthRoute path={ROUTES.ANALYTICS} component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
