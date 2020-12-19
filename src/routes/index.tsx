import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../pages/Main';
import Authorization from '../pages/Authorization';
import NotFound from '../pages/NotFound';
import AuthRoute from './AuthRoute';
import Analytics from '../pages/Analytics';

const Routes: React.FC = () => (
  <div className="main-container">
    <Switch>
      <AuthRoute exact path="/" component={Main} />
      <Route path="/login" component={Authorization} />
      <AuthRoute path="/analytics" component={Analytics} />
      <Route component={NotFound}A />
    </Switch>
  </div>
);

export default Routes;
