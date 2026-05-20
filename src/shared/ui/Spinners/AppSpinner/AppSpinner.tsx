import Spinner from '../Spinner';
import styles from './AppSpinner.module.scss';

const AppSpinner = () => {
  return (
    <div className={styles.container}>
      <Spinner size="large" />
    </div>
  );
};

export default AppSpinner;
