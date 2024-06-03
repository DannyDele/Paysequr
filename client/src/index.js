import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './state/index';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './state/api';
import { ToastContainer } from 'react-toastify';
import authReducer from './features/authSlice';

const persistedAuthState = {
  auth: {
    user: localStorage.getItem('user'),
    token: localStorage.getItem('authToken'),
    isAuthenticated: Boolean(localStorage.getItem('authToken')),
  },
};

const store = configureStore({
  reducer: {
    global : globalReducer,
    [api.reducerPath] : api.reducer,
    auth: authReducer
  },
  preloadedState: persistedAuthState,
  middleware: (getDefault) => getDefault().concat(api.middleware)
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    <ToastContainer/>
    </Provider>
  </React.StrictMode>
);
