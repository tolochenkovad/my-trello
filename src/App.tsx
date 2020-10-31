import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import Header from './components/Header/Header';

const App: React.FC<RouteConfigComponentProps> = ({ route }) => (
  <>
    <Header />
    {route && renderRoutes(route.routes)}
  </>
);

export default App;
