import Register from './Register'
import { fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cookies from 'js-cookie'
import TestWrapper from '../../../jest/TestWrapper'

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
  const { findByTestId } = renderComponent()
  const RegisterRoot = await findByTestId('Register-root')
  const responseRegisterDiv = await findByTestId('responseRegisterDiv')
  const RegisterEmail = await findByTestId('Register-email-form')
  const RegisterPassword = await findByTestId('Register-password-form')
  const RegisterEmailValidationResponse = await findByTestId('Register-email-validation-response')
  const RegisterPasswordValidationResponse = await findByTestId(
    'Register-password-validation-response',
  )
  const formRegisterContainer = await findByTestId('form-Register-container')
  const goToForgotPasswordPage = await findByTestId('go-to-forgot-password-page')

  return {
    RegisterRoot,
    responseRegisterDiv,
    RegisterEmail,
    RegisterPassword,
    RegisterEmailValidationResponse,
    RegisterPasswordValidationResponse,
    formRegisterContainer,
    goToForgotPasswordPage,
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
    } = await setup()
    userEvent.type(RegisterEmail, 'ddd')
    await waitFor(() => {
      expect(RegisterEmailValidationResponse.innerHTML).not.toBe('')
    })
    userEvent.type(RegisterEmail, 'akpufranklin2@gmail.com')
    userEvent.type(RegisterPassword, 'password')
    await waitFor(() => {
      expect(RegisterEmailValidationResponse.innerHTML).toBe('')
      expect(RegisterPasswordValidationResponse.innerHTML).toBe('')
    })
  })

  it('goes to forgotpassword page', async () => {
    const { goToForgotPasswordPage } = await setup()
    userEvent.click(goToForgotPasswordPage)
    expect(mockHistoryPush).toHaveBeenCalled()
  })

  it('submit form and Register was successful', async () => {
    const dataRes = {
      data: {
        RegisterAdmin: {
          success: true,
          token: 'sssss',
        },
      },
    }
    const mRes = { json: jest.fn().mockResolvedValueOnce(dataRes) }
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any)
    ;(global as any).fetch = mockedFetch

    const { RegisterEmail, RegisterPassword, formRegisterContainer } = await setup()
    userEvent.type(RegisterEmail, 'akpufranklin2@gmail.com')
    userEvent.type(RegisterPassword, 'password')

    let cookiesSetRes: any = true

    jest.spyOn(Cookies, 'set').mockImplementationOnce(() => cookiesSetRes)
    fireEvent.submit(formRegisterContainer)
    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalled()
      expect(mockHistoryPush).toHaveBeenCalled()
      expect(mockedFetch).toHaveBeenCalled()
    })
  })

  it('submits form and Register failed', async () => {
    const dataRes = {
      data: {
        RegisterAdmin: {
          success: true,
          token: 'sssss',
        },
      },
      errors: [
        {
          message: 'failed',
        },
      ],
    }
    const mRes = { json: jest.fn().mockResolvedValueOnce(dataRes) }
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any)
    ;(global as any).fetch = mockedFetch

    const { RegisterEmail, RegisterPassword, formRegisterContainer, responseRegisterDiv } =
      await setup()
    userEvent.type(RegisterEmail, 'akpufranklin2@gmail.com')
    userEvent.type(RegisterPassword, 'pass')
    fireEvent.submit(formRegisterContainer)
    await waitFor(() => {
      expect(responseRegisterDiv.innerHTML).not.toBe('')
      expect(mockedFetch).toHaveBeenCalled()
    })
  })
})
