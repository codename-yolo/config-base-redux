import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './App.tsx'
import './index.css'

import configureStore from './redux/configureStore.ts'

const initialState = {};
const store = configureStore(initialState);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>,
)
