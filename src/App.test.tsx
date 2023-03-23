import React from 'react'
import App from './App'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store/store'

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}

describe('App test', () => {
  test('renders app component', async () => {
    const elemCalled = renderComponent()
    const { findByTestId } = elemCalled
    expect(await findByTestId('app-data-id')).toBeTruthy()
  })
})
