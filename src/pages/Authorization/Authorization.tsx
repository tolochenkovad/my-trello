import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { toastr } from 'react-redux-toastr';
import firebase from 'firebase/app';
import { getAuth } from '../../store/Authorization/selectors';
import { isEmpty } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Authorization: React.FC = () => {
  const auth = useSelector(getAuth);
  if (!isEmpty(auth)) {
    console.log('to main');
    return <Redirect to="/" />;
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
          signInSuccessUrl: '/login',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
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