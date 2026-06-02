import { Route, Switch } from 'react-router-dom';
import { Board } from '@/modules/Board';
import { Authorization } from '@/modules/Authorization';
import { NotFound } from '@/modules/NotFound';
import { Analytics } from '@/modules/Analytics';
import { Tags } from '@/modules/Tags';
import { AuthRoute } from './AuthRoute';
import { ROUTES } from './constants';

const Routes = () => (
  <div className="main-container">
    <Switch>
      <AuthRoute exact path={ROUTES.MAIN} component={Board} />
      <Route path={ROUTES.LOGIN} component={Authorization} />
      <AuthRoute path={ROUTES.ANALYTICS} component={Analytics} />
      <AuthRoute path={ROUTES.TAGS} component={Tags} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
