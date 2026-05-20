import { Spinner } from '../Spinner';
import styles from './AppSpinner.module.scss';

export const AppSpinner = () => {
  return (
    <div className={styles.container}>
      <Spinner size="large" />
    </div>
  );
};
