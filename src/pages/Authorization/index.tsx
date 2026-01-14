import { FC } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { toastr } from 'react-redux-toastr';
import firebase from 'firebase/compat/app';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
import { useAuth } from '../../hooks/useAuth';
import classes from './Authorization.module.scss';

const Authorization: FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to={ROUTES.MAIN} />;
  }

  const onSuccessSocialLogin = (): boolean => {
    toastr.success('Successfully authorized', '');
    return true;
  };
  return (
    <div className={classes.auth}>
      <div className={classes.phrase}>
        To use this application, please login in through a convenient service for you
      </div>
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

export default Authorization;
