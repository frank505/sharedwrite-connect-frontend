import Login from "./Login";
import { fireEvent,
  waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Cookies from "js-cookie";
import TestWrapper from '../../../jest/TestWrapper';


const mockHistoryPush = jest.fn();





jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));





const renderComponent = () =>
{
 return TestWrapper(<Login/>);
}



const setup = async() =>
{
    const {findByTestId} = renderComponent();
    const loginRoot = await findByTestId('login-root');
    const responseLoginDiv = await findByTestId('responseLoginDiv');
    const loginEmail = await findByTestId('login-email-form');
    const loginPassword = await findByTestId('login-password-form');
    const loginEmailValidationResponse = await findByTestId('login-email-validation-response');
    const loginPasswordValidationResponse = await findByTestId('login-password-validation-response');
    const formLoginContainer = await findByTestId('form-login-container');
    const goToForgotPasswordPage = await findByTestId('go-to-forgot-password-page');

    return {
      loginRoot,
      responseLoginDiv,
      loginEmail,
      loginPassword,
      loginEmailValidationResponse,
      loginPasswordValidationResponse,
      formLoginContainer,
      goToForgotPasswordPage
    }


}


describe('Login component', () => {

  let originFetch:any;

  beforeEach(() => {
    originFetch = (global as any).fetch;
  });
  afterEach(() => {
    (global as any).fetch = originFetch;
  });


   afterEach(()=>{;
     jest.resetAllMocks();
   })

    it('renders component properly',()=>
    {
      renderComponent();
    });


    it('validates input on form change', async()=>
    {

      const {loginEmail,loginEmailValidationResponse,
        loginPassword,loginPasswordValidationResponse } = await setup();
        userEvent.type(loginEmail,'ddd');
        await waitFor(()=>{
         expect(loginEmailValidationResponse.innerHTML).not.toBe('');
        });
          userEvent.type(loginEmail,'akpufranklin2@gmail.com');
          userEvent.type(loginPassword,'password');
          await waitFor(()=>
          {
             expect(loginEmailValidationResponse.innerHTML).toBe("");
             expect(loginPasswordValidationResponse.innerHTML).toBe('');
          })
    });

it('goes to forgotpassword page', async()=>
{
  const {goToForgotPasswordPage} = await setup();
      userEvent.click(goToForgotPasswordPage);
      expect(mockHistoryPush).toHaveBeenCalled();
});

 it('submit form and login was successful' ,async()=>{

  const dataRes = {
    data:{
      loginAdmin:{
        success:true,
        token:'sssss'
      }
    }
  }
  const mRes = { json: jest.fn().mockResolvedValueOnce(dataRes) };
  const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
  (global as any).fetch = mockedFetch;

  const {loginEmail,loginPassword,formLoginContainer } = await setup();
  userEvent.type(loginEmail,'akpufranklin2@gmail.com');
  userEvent.type(loginPassword,'password');

  let cookiesSetRes:any = true;

 jest.spyOn(Cookies,'set').mockImplementationOnce(()=>cookiesSetRes);
 fireEvent.submit(formLoginContainer);
 await waitFor(()=>
 {
  expect(Cookies.set).toHaveBeenCalled();
  expect(mockHistoryPush).toHaveBeenCalled();
  expect(mockedFetch).toHaveBeenCalled();
 });

 });


it('submits form and login failed', async() =>
{
  const dataRes = {
    data:{
      loginAdmin:{
        success:true,
        token:'sssss'
      }
    },
    errors:[{
      message:'failed'
    }]
  }
  const mRes = { json: jest.fn().mockResolvedValueOnce(dataRes) };
  const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
  (global as any).fetch = mockedFetch;

  const {loginEmail,loginPassword,formLoginContainer,responseLoginDiv } = await setup();
  userEvent.type(loginEmail,'akpufranklin2@gmail.com');
  userEvent.type(loginPassword,'pass');
  fireEvent.submit(formLoginContainer);
  await waitFor(()=>{
    expect(responseLoginDiv.innerHTML).not.toBe('');
    expect(mockedFetch).toHaveBeenCalled();
   });


})

  });
