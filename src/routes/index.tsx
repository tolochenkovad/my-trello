import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../pages/Main';
import Authorization from '../pages/Authorization';
import NotFound from '../pages/NotFound';
import AuthRoute from './AuthRoute';

const Routes: React.FC = () => (
  <Switch>
    <AuthRoute exact path="/" component={Main} />
    <Route path="/login" component={Authorization} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
