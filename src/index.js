import React from 'react'
import { render } from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';

import App from './App'
import rootReducer from './slices'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore({ reducer: rootReducer })

render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
)
