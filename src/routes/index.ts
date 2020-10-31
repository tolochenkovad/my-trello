import App from '../App';
import Container from '../components/Container';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import { RouteConfig } from 'react-router-config';

export const routes: RouteConfig[] = [
  {
    component: App,
    routes: [
      {
        component: Container,
        path: '/',
        exact: true,
      },
      {
        component: Login,
        path: '/login',
      },
      {
        component: Login,
        path: '/signup',
      },
      {
        component: NotFound,
      },
    ],
  },
];
