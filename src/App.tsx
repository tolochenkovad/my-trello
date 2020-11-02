import React from 'react';
import Header from './layout/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import ReduxToastr from 'react-redux-toastr';
import { COLLECTIONS } from './constancts';
import * as firebase from 'firebase';
import Routes from './routes';

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
        <Header />
        <Routes />
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
