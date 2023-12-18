import {StrictMode} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import App from './App';
import GlobalStyles from './GlobalStyles';
import WebVitals from './WebVitals';
import reactDom from 'react-dom/client';

import './i18n/i18n';

const MOUNT_NODE = document.getElementById('root');

if (!MOUNT_NODE) {
  throw new Error('Failed to find the root element');
}

const root = reactDom.createRoot(MOUNT_NODE);

root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <GlobalStyles />
      <WebVitals showStatusInConsoleLog />
    </HelmetProvider>
  </StrictMode>
);
