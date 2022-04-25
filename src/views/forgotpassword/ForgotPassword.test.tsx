import { fireEvent,
  waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import ForgotPassword from "./ForgotPassword";
import TestWrapperComponent from "../../../jest/TestWrapper";




const mockHistoryPush = jest.fn();





jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));




const renderComponent = () =>
{
 return TestWrapperComponent(<ForgotPassword />);
}




const setup = async() =>
{
    const {findByTestId} = renderComponent();
    const forgotPasswordRoot = await findByTestId('forgot-password-root');
    const responseForgotPasswordDiv = await findByTestId('responseForgotPasswordDiv');
    const forgotPasswordEmail = await findByTestId('forgot-password-email-form');
    const forgotPasswordEmailValidationResponse = await findByTestId('forgot-password-email-validation-response');
    const formForgotPasswordContainer = await findByTestId('form-forgot-password-container');
    const goToLoginPage = await findByTestId('go-to-login-page');


    return {
      forgotPasswordRoot,
      responseForgotPasswordDiv,
      forgotPasswordEmail,
      forgotPasswordEmailValidationResponse,
      formForgotPasswordContainer,
      goToLoginPage
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



    it('validates input on form change', async()=>
    {

      const {forgotPasswordEmail,forgotPasswordEmailValidationResponse } = await setup();
        userEvent.type(forgotPasswordEmail,'ddd');
        await waitFor(()=>{
         expect(forgotPasswordEmailValidationResponse.innerHTML).not.toBe('');
        });
          userEvent.type(forgotPasswordEmail,'akpufranklin2@gmail.com');
          await waitFor(()=>
          {
             expect(forgotPasswordEmailValidationResponse.innerHTML).toBe("");

          })
    });

it('goes to forgotpassword page', async()=>
{
  const {goToLoginPage} = await setup();
      userEvent.click(goToLoginPage);
      expect(mockHistoryPush).toHaveBeenCalled();
});


 it('submit form and forgot password was successful' ,async()=>
 {
  const dataRes = {
    data:{
      forgotPasswordAdmin: {
        success:true,
        email:'akpufranklin2@gmail.com',
        code:'2323',
        message:'login successful'
      },
    },
    errors:[{
      message:'failed'
    }]
  }
  const mRes = { json: jest.fn().mockResolvedValueOnce(dataRes) };
  const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);

  (global as any).fetch = mockedFetch;

  const {forgotPasswordEmail,formForgotPasswordContainer} = await setup();
  userEvent.type(forgotPasswordEmail,'akpufranklin2@gmail.com');

 fireEvent.submit(formForgotPasswordContainer);
 await waitFor(()=>
 {
   expect(mockedFetch).toHaveBeenCalled();
  expect(mockHistoryPush).toHaveBeenCalled();
 });

 });





it('submits form and login failed', async() =>
{

  const {forgotPasswordEmail,formForgotPasswordContainer,responseForgotPasswordDiv } = await setup();
  userEvent.type(forgotPasswordEmail,'aaaaaaa@gmail.com');
  expect(responseForgotPasswordDiv.innerHTML).toBe('');
  fireEvent.submit(formForgotPasswordContainer);
  await waitFor(()=>{
    expect(responseForgotPasswordDiv.innerHTML).not.toBe('');
   });


})

  });
