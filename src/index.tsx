import React from 'react';
import { createRoot } from 'react-dom/client';
import 'reset-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'react-calendar/dist/Calendar.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
