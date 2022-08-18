import React from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);