import React, { FC } from 'react';
// @ts-ignore
import { StyledFirebaseAuth } from 'react-firebaseui';
import { toastr } from 'react-redux-toastr';
import firebase from 'firebase/app';
import { getAuth } from '../../store/Authorization/selectors';
import { isEmpty } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../routes/constants';

const Authorization: FC = () => {
  const auth = useSelector(getAuth);
  if (!isEmpty(auth)) {
    return <Redirect to={ROUTES.MAIN} />;
  }
  const onSuccessSocialLogin = (): boolean => {
    toastr.success('Successfully authorized', '');
    return true;
  };
  return (
    <div className="auth">
      <div className="auth__phrase">To use this application, please login in through a convenient service for you</div>
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
