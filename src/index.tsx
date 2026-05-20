import { createRoot } from 'react-dom/client';
import 'reset-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import 'react-calendar/dist/Calendar.css';
import App from './App';
import './api/firebase/init';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
