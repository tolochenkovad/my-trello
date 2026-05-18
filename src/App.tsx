import React from 'react';
import { Toaster } from 'sonner';
import Header from './shared/ui/Header';
import { AppProviders } from './providers/AppProviders';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App: React.FC = () => (
  <div className='app-container'>
    <AppProviders>
      <BrowserRouter>
        <Header />
        <Routes />
        <Toaster />
      </BrowserRouter>
    </AppProviders>
  </div>
);

export default App;
