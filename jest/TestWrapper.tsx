import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../src/store/store'

const TestWrapperComponent = (component: any) => {
  const query = new QueryClient({
    defaultOptions: {
      queries: {
        //  turns retries off
        retry: false,
      },
    },
  })

  return render(
    <Provider store={store}>
      <QueryClientProvider client={query}>{component}</QueryClientProvider>
    </Provider>,
  )
}

export default TestWrapperComponent
