import Register from './Register'
import { fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders as TestWrapper } from '../../../jest/TestWrapper'
import { rest } from 'msw'
import { server, baseTestUrl } from '../../setupTests'

// Replace with your own RTK query API

const response: any = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  data: {
    success: true,
    data: [],
    message: 'email verification code has been sent to your email',
  },
  error: null,
}

const errResponse = {
  isLoading: false,
  isSuccess: false,
  isError: true,
  data: null,
  error: {
    success: false,
    error: {
      email: ['Email already exists'],
    },
  },
}

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const renderComponent = () => {
  return TestWrapper(<Register />)
}

const setup = async () => {
  const { findByTestId, getByText } = renderComponent()
  const RegisterRoot = await findByTestId('register-root')
  const RegisterEmail = await findByTestId('register-email-form')
  const RegisterPassword = await findByTestId('register-password-form')
  const RegisterConfirmPassword = await findByTestId('register-confirm-password-form')
  const RegisterFirstName = await findByTestId('register-first-name-form')
  const RegisterLastName = await findByTestId('register-last-name-form')
  const RegisterConfirmPasswordValidationResponse = await findByTestId(
    'register-confirm-password-validation-response',
  )
  const RegisterEmailValidationResponse = await findByTestId('register-email-validation-response')
  const RegisterPasswordValidationResponse = await findByTestId(
    'register-password-validation-response',
  )
  const RegisterFirstNameValidationResponse = await findByTestId(
    'register-first-name-validation-response',
  )
  const RegisterLastNameValidationResponse = await findByTestId(
    'register-last-name-validation-response',
  )
  const formRegisterContainer = await findByTestId('form-register-container')
  const goToForgotPasswordPage = await findByTestId('go-to-forgot-password-page')
  const goToLoginPage = await findByTestId('go-to-login-page')
  const ResponseRegisterErrDiv = await findByTestId('response-register-err-div')

  return {
    RegisterRoot,
    RegisterEmail,
    RegisterPassword,
    RegisterConfirmPassword,
    RegisterEmailValidationResponse,
    RegisterConfirmPasswordValidationResponse,
    RegisterPasswordValidationResponse,
    RegisterFirstName,
    RegisterLastName,
    RegisterFirstNameValidationResponse,
    RegisterLastNameValidationResponse,
    formRegisterContainer,
    goToForgotPasswordPage,
    goToLoginPage,
    findByTestId,
    getByText,
    ResponseRegisterErrDiv,
  }
}

describe('Register component', () => {
  let originFetch: any

  beforeEach(() => {
    originFetch = (global as any).fetch
  })
  afterEach(() => {
    ;(global as any).fetch = originFetch
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders component properly', () => {
    renderComponent()
  })

  it('validates input on form change', async () => {
    const {
      RegisterEmail,
      RegisterEmailValidationResponse,
      RegisterPassword,
      RegisterPasswordValidationResponse,
      RegisterFirstName,
      RegisterFirstNameValidationResponse,
      RegisterLastName,
      RegisterLastNameValidationResponse,
      RegisterConfirmPassword,
      RegisterConfirmPasswordValidationResponse,
    } = await setup()
    userEvent.type(RegisterEmail, 'ddd')

    await waitFor(() => {
      expect(RegisterEmailValidationResponse.innerHTML).not.toBe('')
    })
    userEvent.type(RegisterEmail, 'akpufranklin2@gmail.com')
    userEvent.type(RegisterPassword, '$AQWSDC12s22.sdewesw23455ded')
    userEvent.type(RegisterConfirmPassword, '$AQWSDC12s22.sdewesw23455ded')
    userEvent.type(RegisterFirstName, 'Franklin'), userEvent.type(RegisterLastName, 'Akpu')
    await waitFor(() => {
      expect(RegisterEmailValidationResponse.innerHTML).toBe('')
      expect(RegisterPasswordValidationResponse.innerHTML).toBe('')
      expect(RegisterFirstNameValidationResponse.innerHTML).toBe('')
      expect(RegisterLastNameValidationResponse.innerHTML).toBe('')
      expect(RegisterConfirmPasswordValidationResponse.innerHTML).toBe('')
    })
  })

  it('goes to forgotpassword page', async () => {
    const { goToForgotPasswordPage } = await setup()
    userEvent.click(goToForgotPasswordPage)
    expect(mockHistoryPush).toHaveBeenCalled()
  })

  it('goes to login page', async () => {
    const { goToLoginPage } = await setup()
    userEvent.click(goToLoginPage)
    expect(mockHistoryPush).toHaveBeenCalled()
  })

  it('submit form and Register was successful and redirects to verify passcode', async () => {
    const {
      RegisterEmail,
      RegisterEmailValidationResponse,
      RegisterPassword,
      RegisterPasswordValidationResponse,
      RegisterFirstName,
      RegisterFirstNameValidationResponse,
      RegisterLastName,
      RegisterLastNameValidationResponse,
      formRegisterContainer,
      RegisterConfirmPassword,
      RegisterConfirmPasswordValidationResponse,
      findByTestId,
    } = await setup()
    userEvent.type(RegisterEmail, 'akpufranklin2@gmail.com')
    userEvent.type(RegisterPassword, '$AQWSDC12s22.sdewesw23455ded')
    userEvent.type(RegisterConfirmPassword, '$AQWSDC12s22.sdewesw23455ded')
    userEvent.type(RegisterFirstName, 'Franklin'), userEvent.type(RegisterLastName, 'Akpu')

    server.use(
      rest.post(`${baseTestUrl}/user/register`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(response))
      }),
    )

    fireEvent.submit(formRegisterContainer)

    await waitFor(() => {
      expect(RegisterEmailValidationResponse.innerHTML).toBe('')
      expect(RegisterPasswordValidationResponse.innerHTML).toBe('')
      expect(RegisterFirstNameValidationResponse.innerHTML).toBe('')
      expect(RegisterLastNameValidationResponse.innerHTML).toBe('')
      expect(RegisterConfirmPasswordValidationResponse.innerHTML).toBe('')
      expect(mockHistoryPush).toHaveBeenCalled()
    })
  })

  it('submit form and Register was not successful ', async () => {
    const {
      RegisterEmail,
      RegisterEmailValidationResponse,
      RegisterPassword,
      RegisterPasswordValidationResponse,
      RegisterFirstName,
      RegisterFirstNameValidationResponse,
      RegisterLastName,
      RegisterLastNameValidationResponse,
      formRegisterContainer,
      RegisterConfirmPassword,
      RegisterConfirmPasswordValidationResponse,
      ResponseRegisterErrDiv,
      findByTestId,
    } = await setup()
    userEvent.type(RegisterEmail, 'akpufranklin2@gmail.com')
    userEvent.type(RegisterPassword, '$AQWSDC12s22.sdewesw23455ded')
    userEvent.type(RegisterConfirmPassword, '$AQWSDC12s22.sdewesw23455ded')
    userEvent.type(RegisterFirstName, 'Franklin'), userEvent.type(RegisterLastName, 'Akpu')
    expect(ResponseRegisterErrDiv.innerHTML).toBe('')

    server.use(
      rest.post(`${baseTestUrl}/user/register`, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(errResponse))
      }),
    )

    fireEvent.submit(formRegisterContainer)
    await waitFor(() => {
      expect(RegisterEmailValidationResponse.innerHTML).toBe('')
      expect(RegisterPasswordValidationResponse.innerHTML).toBe('')
      expect(RegisterFirstNameValidationResponse.innerHTML).toBe('')
      expect(RegisterLastNameValidationResponse.innerHTML).toBe('')
      expect(RegisterConfirmPasswordValidationResponse.innerHTML).toBe('')
      expect(ResponseRegisterErrDiv.innerHTML).not.toBe('')
    })
  })
})
