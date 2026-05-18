import React from 'react';
import { Toaster } from 'sonner';
import Header from './common/Header';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes />
    <Toaster />
  </BrowserRouter>
);

export default App;
