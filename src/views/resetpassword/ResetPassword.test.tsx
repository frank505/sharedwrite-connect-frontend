import { Provider } from 'react-redux'
import { store } from '../../store/store'
import ResetPassword from './ResetPassword'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import Cookies from 'js-cookie'

const mockHistoryPush = jest.fn()

const mockUseLocationValue = {
  pathname: '/reset-password',
  search: '',
  hash: '',
  state: {
    emailToResetPassword: 'dddd@gmail.com',
  },
}

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => mockUseLocationValue,
}))

const renderComponent = () => {
  const Comp = render(
    <Provider store={store}>
      <ResetPassword />
    </Provider>,
  )

  return Comp
}

const setup = async () => {
  const { findByTestId } = renderComponent()
  const resetPassword = await findByTestId('reset-password-root')
  const responseResetPasswordDiv = await findByTestId('responseResetPasswordDiv')
  const resetPasswordCode = await findByTestId('reset-password-code-form')
  const resetPasswordPassword = await findByTestId('reset-password-password-form')
  const resetPasswordConfirm = await findByTestId('reset-password-confirm-code-form')
  const resetPasswordCodeValidationResponse = await findByTestId(
    'reset-password-code-validation-response',
  )
  const resetPasswordPasswordValidationResponse = await findByTestId(
    'reset-pasword-password-validation-response',
  )
  const resetPasswordConfirmValidationResponse = await findByTestId(
    'reset-password-confirm-validation-response',
  )
  const formResetPasswordContainer = await findByTestId('form-reset-password-container')
  const goToLoginPage = await findByTestId('go-to-login-page')

  return {
    resetPassword,
    responseResetPasswordDiv,
    resetPasswordCode,
    resetPasswordPassword,
    resetPasswordConfirm,
    resetPasswordCodeValidationResponse,
    resetPasswordPasswordValidationResponse,
    resetPasswordConfirmValidationResponse,
    formResetPasswordContainer,
    goToLoginPage,
  }
}

describe('Reset Password', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders component properly', () => {
    renderComponent()
  })

  it('goes to login page', async () => {
    const { goToLoginPage } = await setup()
    userEvent.click(goToLoginPage)
    expect(mockHistoryPush).toHaveBeenCalled()
  })

  it('validates input on form change', async () => {
    const {
      resetPasswordCode,
      resetPasswordPassword,
      resetPasswordConfirm,
      resetPasswordCodeValidationResponse,
      resetPasswordPasswordValidationResponse,
      resetPasswordConfirmValidationResponse,
    } = await setup()

    userEvent.type(resetPasswordCode, '2424')
    userEvent.type(resetPasswordPassword, 'password')
    userEvent.type(resetPasswordConfirm, 'confirm')
    await waitFor(() => {
      expect(resetPasswordCodeValidationResponse.innerHTML).toBe('')
      expect(resetPasswordPasswordValidationResponse.innerHTML).toBe('')
      expect(resetPasswordConfirmValidationResponse.innerHTML).not.toBe('')
    })
  })

  it('submit form and reset password was successful', async () => {
    const {
      formResetPasswordContainer,
      resetPasswordCode,
      resetPasswordPassword,
      resetPasswordConfirm,
      responseResetPasswordDiv,
    } = await setup()
    userEvent.type(resetPasswordCode, '2424')
    userEvent.type(resetPasswordConfirm, 'password')
    userEvent.type(resetPasswordPassword, 'password')
    fireEvent.submit(formResetPasswordContainer)
    expect(responseResetPasswordDiv.innerHTML).toBe('')
    await waitFor(() => {
      expect(responseResetPasswordDiv).not.toBe('')
    })
  })

  it('submits form and login failed', async () => {
    const {
      formResetPasswordContainer,
      resetPasswordCode,
      resetPasswordPassword,
      resetPasswordConfirm,
      responseResetPasswordDiv,
    } = await setup()
    userEvent.type(resetPasswordCode, 'akpufranklin2@gmail.com')
    userEvent.type(resetPasswordPassword, 'pass')
    userEvent.type(resetPasswordConfirm, 'pass')
    fireEvent.submit(formResetPasswordContainer)
    expect(responseResetPasswordDiv.innerHTML).toBe('')
    await waitFor(() => {
      expect(responseResetPasswordDiv.innerHTML).not.toBe('')
    })
  })
})
