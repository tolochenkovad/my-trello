import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/constants';
import classes from './NotFound.module.scss';

export const NotFound = () => (
  <div className={classes.notFound}>
    <div>Oops, Page Not Found :(</div>
    <Link to={ROUTES.MAIN}>Go to main page</Link>
  </div>
);
