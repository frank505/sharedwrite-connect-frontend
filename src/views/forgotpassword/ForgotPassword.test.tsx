import { render, fireEvent,
  waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import ForgotPassword from "./ForgotPassword";
import { FORGOT_PASSWORD_CODE_ADMIN } from "../../Graphql/Mutations/Auth";


const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
 useHistory: () => ({
   push: mockHistoryPush,
 }),
}));



const mocks = [
  {
    request:{
      query: FORGOT_PASSWORD_CODE_ADMIN,
      variables: {
        email: 'akpufranklin2@gmail.com',
      },
    },
    result: {
      data: {
        forgotPasswordAdmin: {
          success:true,
          email:'akpufranklin2@gmail.com',
          code:'2323',
          message:'login successful'
        },
      },
    },

  }
];



const renderComponent = () =>
{
  const Comp =  render(

    <Provider store={store} >
    <MockedProvider mocks={mocks} addTypename={false} >
    <ForgotPassword/>
    </MockedProvider>
    </Provider>
    );

    return Comp;
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


   afterEach(()=>{;
     jest.resetAllMocks();
   })

    it('renders component properly',()=>
    {
      renderComponent();
    });


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

 it('submit form and forgot password was successful' ,async()=>{

  const {forgotPasswordEmail,formForgotPasswordContainer} = await setup();
  userEvent.type(forgotPasswordEmail,'akpufranklin2@gmail.com');

 fireEvent.submit(formForgotPasswordContainer);
 await waitFor(()=>
 {
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
