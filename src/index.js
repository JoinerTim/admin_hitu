import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import Spinner from "./components/spinner";
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ContextProvider>
          <App />
        </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
