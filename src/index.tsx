import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import ReduxToastr from 'react-redux-toastr';
import { routes } from './routes';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      closeOnToastrClick
    />
  </Provider>,
  document.getElementById('root'),
);
