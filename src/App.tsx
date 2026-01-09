import React from 'react';
import Header from './common/Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import Routes from './routes';
import store from './store';

const App: React.FC = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
