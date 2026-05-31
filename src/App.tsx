import { Toaster } from 'sonner';
import { Header } from './layouts/Header';
import { AppProviders } from './providers/AppProviders';
import { useAuth } from './shared/hooks';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="app-container">
      <AppProviders>
        <BrowserRouter>
          {isAuthenticated && <Header />}
          <Routes />
          <Toaster />
        </BrowserRouter>
      </AppProviders>
    </div>
  );
};

export default App;
