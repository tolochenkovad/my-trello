import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/constants';
import styles from './NotFound.module.scss';

export const NotFound = () => (
  <div className={styles.notFound}>
    <div>Oops, Page Not Found :(</div>
    <Link to={ROUTES.MAIN}>Go to main page</Link>
  </div>
);
