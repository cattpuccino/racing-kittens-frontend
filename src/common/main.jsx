import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Navbar } from './Navbar.jsx';
import '../styles/index.css';
import Routing from './Routing.jsx';
import AuthProvider from '../auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Routing />
    </AuthProvider>
  </React.StrictMode>,
)
