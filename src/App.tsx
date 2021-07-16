import React from 'react';
import Header from './common/Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import ReduxToastr from 'react-redux-toastr';
import { COLLECTIONS } from './constants';
import * as firebase from 'firebase/app';
import Routes from './routes';
import ErrorBoundary from './common/ErrorBoundary';

const rrfConfig = {
  userProfile: COLLECTIONS.users,
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

const App: React.FC = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <ErrorBoundary>
          <Header />
          <Routes />
        </ErrorBoundary>
      </BrowserRouter>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-center"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default App;
