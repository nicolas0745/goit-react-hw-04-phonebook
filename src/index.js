import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/app/App';
import { ContactProvider } from 'components/contact-context/ContactContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </React.StrictMode>
);
