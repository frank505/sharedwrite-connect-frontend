import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
// import { client } from './httpCallSetUp/ApolloClientProvider'
// import {  ApolloProvider } from '@apollo/client';
// import { QueryClient, QueryClientProvider } from 'react-query'

// const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    {/* <QueryClientProvider client={queryClient}> */}
      <App />
    {/* </QueryClientProvider> */}
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
