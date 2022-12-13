import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {HelmetProvider} from 'react-helmet-async'
import App from './App';
import { StoreProvider } from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* helmet for showing dynamic name based on product in browser tab */}
  <StoreProvider>
  <HelmetProvider>
    <App />
  </HelmetProvider>
  </StoreProvider>
  </React.StrictMode>
);