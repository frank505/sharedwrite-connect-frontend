import Register from './Register'
import { fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cookies from 'js-cookie'
import { renderWithProviders as TestWrapper } from '../../../jest/TestWrapper';
import { useUserRegisterMutation, v1Api } from '../../http/ApiSetup';
import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { server, baseTestUrl } from '../../setupTests';


// Replace with your own RTK query API

const response:any = {
  isLoading: false, isSuccess: true, isError: false, data: {
    success: true,
    data:[],
    message:'email verification code has been sent to your email'
  }, error: null
}

// const server = setupServer(
//   rest.all('http://localhost:80/api/*', (req, res, ctx) => {
//     // Replace with your own mocked response data
//     return res(ctx.status(200), ctx.json(response));
//   }),
// );

// beforeAll(() => server.listen());
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());


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
  const RegisterRoot = await findByTestId('register-root')
  const RegisterEmail = await findByTestId('register-email-form')
  const RegisterPassword = await findByTestId('register-password-form');
  const RegisterFirstName = await findByTestId('register-first-name-form');
  const RegisterLastName = await findByTestId('register-last-name-form');
  const RegisterEmailValidationResponse = await findByTestId('register-email-validation-response');
  const RegisterPasswordValidationResponse = await findByTestId('register-password-validation-response');
  const RegisterFirstNameValidationResponse = await findByTestId('register-first-name-validation-response');
  const RegisterLastNameValidationResponse = await findByTestId('register-last-name-validation-response');
  const formRegisterContainer = await findByTestId('form-register-container')
  const goToForgotPasswordPage = await findByTestId('go-to-forgot-password-page')
  const goToLoginPage = await findByTestId('go-to-login-page')

  return {
    RegisterRoot,
    RegisterEmail,
    RegisterPassword,
    RegisterEmailValidationResponse,
    RegisterPasswordValidationResponse,
    RegisterFirstName,
    RegisterLastName,
    RegisterFirstNameValidationResponse,
    RegisterLastNameValidationResponse,
    formRegisterContainer,
    goToForgotPasswordPage,
    goToLoginPage
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
      RegisterLastNameValidationResponse
    } = await setup()
    userEvent.type(RegisterEmail, 'ddd');


    await waitFor(() => {
      expect(RegisterEmailValidationResponse.innerHTML).not.toBe('')
    })
    userEvent.type(RegisterEmail, 'akpufranklin2@gmail.com')
    userEvent.type(RegisterPassword, '$AQWSDC12s22.sdewesw23455ded')
    userEvent.type(RegisterFirstName, 'Franklin'),
    userEvent.type(RegisterLastName, 'Akpu')
    await waitFor(() => {
      expect(RegisterEmailValidationResponse.innerHTML).toBe('')
      expect(RegisterPasswordValidationResponse.innerHTML).toBe('')
      expect(RegisterFirstNameValidationResponse.innerHTML).toBe('')
      expect(RegisterLastNameValidationResponse.innerHTML).toBe('')
    })
  })

  it('goes to forgotpassword page', async () => {
    const { goToForgotPasswordPage } = await setup()
    userEvent.click(goToForgotPasswordPage)
    expect(mockHistoryPush).toHaveBeenCalled()
  });

 it('goes to login page', async ()=> {
    const {goToLoginPage} = await setup()
    userEvent.click(goToLoginPage)
    expect(mockHistoryPush).toHaveBeenCalled()
 })


 it.only('submit form and Register was not successful and redirects to verify passcode', async () => {

  const {
    RegisterEmail,
    RegisterEmailValidationResponse,
    RegisterPassword,
    RegisterPasswordValidationResponse,
    RegisterFirstName,
    RegisterFirstNameValidationResponse,
    RegisterLastName,
    RegisterLastNameValidationResponse,
    formRegisterContainer
  } = await setup();
  userEvent.type(RegisterEmail, 'akpufranklin2@gmail.com')
  userEvent.type(RegisterPassword, '$AQWSDC12s22.sdewesw23455ded')
  userEvent.type(RegisterFirstName, 'Franklin'),
  userEvent.type(RegisterLastName, 'Akpu');


//  const {result} = renderHook(() => useUserRegisterMutation({
//     email: 'akpufranklin2@gmail.com',
//     password: '$AQWSDC12s22.sdewesw23455ded',
//     firstName: 'Franklin',
//     lastName: 'Akpu'
//   } as any));
  server.use(rest.post(`${baseTestUrl}register`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  }));


  fireEvent.submit(formRegisterContainer);

  await waitFor(() => {
    expect(RegisterEmailValidationResponse.innerHTML).toBe('')
    expect(RegisterPasswordValidationResponse.innerHTML).toBe('')
    expect(RegisterFirstNameValidationResponse.innerHTML).toBe('')
    expect(RegisterLastNameValidationResponse.innerHTML).toBe('')
    expect(mockHistoryPush).toHaveBeenCalled()
  })


 });

  // it('submit form and Register was successful', async () => {
  //   const dataRes = {
  //     data: {
  //       RegisterAdmin: {
  //         success: true,
  //         token: 'sssss',
  //       },
  //     },
  //   }
  //   const mRes = { json: jest.fn().mockResolvedValueOnce(dataRes) }
  //   const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any)
  //   ;(global as any).fetch = mockedFetch

  //   const { RegisterEmail, RegisterPassword, formRegisterContainer } = await setup()
  //   userEvent.type(RegisterEmail, 'akpufranklin2@gmail.com')
  //   userEvent.type(RegisterPassword, 'password')

  //   let cookiesSetRes: any = true

  //   jest.spyOn(Cookies, 'set').mockImplementationOnce(() => cookiesSetRes)
  //   fireEvent.submit(formRegisterContainer)
  //   await waitFor(() => {
  //     expect(Cookies.set).toHaveBeenCalled()
  //     expect(mockHistoryPush).toHaveBeenCalled()
  //     expect(mockedFetch).toHaveBeenCalled()
  //   })
  // })

  // it('submits form and Register failed', async () => {
  //   const dataRes = {
  //     data: {
  //       RegisterAdmin: {
  //         success: true,
  //         token: 'sssss',
  //       },
  //     },
  //     errors: [
  //       {
  //         message: 'failed',
  //       },
  //     ],
  //   }
  //   const mRes = { json: jest.fn().mockResolvedValueOnce(dataRes) }
  //   const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any)
  //   ;(global as any).fetch = mockedFetch

  //   const { RegisterEmail, RegisterPassword, formRegisterContainer, responseRegisterDiv } =
  //     await setup()
  //   userEvent.type(RegisterEmail, 'akpufranklin2@gmail.com')
  //   userEvent.type(RegisterPassword, 'pass')
  //   fireEvent.submit(formRegisterContainer)
  //   await waitFor(() => {
  //     expect(responseRegisterDiv.innerHTML).not.toBe('')
  //     expect(mockedFetch).toHaveBeenCalled()
  //   })
  // })
})
