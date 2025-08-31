import React from 'react';

import { createRoot } from 'react-dom/client';

import { defineCustomElements } from "@ionic/pwa-elements/loader";

// Call the element loader before the render call
defineCustomElements(window);

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);