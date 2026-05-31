import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase/compat/app';
import { Redirect } from 'react-router-dom';
import { showToast } from '@/shared/utils/showToast';
import { ROUTES } from '@/routes/constants';
import { useAuth } from '@/shared/hooks';
import styles from './Authorization.module.scss';

export const Authorization = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to={ROUTES.MAIN} />;
  }

  const onSuccessSocialLogin = (): boolean => {
    showToast('Successfully authorized', 'success');
    return true;
  };

  return (
    <div className={styles.auth}>
      <div className={styles.phrase}>To use this application, please login in through a convenient service for you</div>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: 'popup',
          signInSuccessUrl: ROUTES.LOGIN,
          signInOptions: [
            firebase.auth?.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth?.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth?.GithubAuthProvider.PROVIDER_ID,
          ],
          callbacks: {
            signInSuccessWithAuthResult: () => onSuccessSocialLogin(),
          },
        }}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
};
