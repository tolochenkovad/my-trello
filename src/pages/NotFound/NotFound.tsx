import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
const styles = require('./NotFound.module.scss');

const NotFound: React.FC = () => (
  <div className={styles.notFound}>
    <div>Oops, Page Not Found :(</div>
    <Link to={ROUTES.MAIN}>Go to main page</Link>
  </div>
);

export default NotFound;
