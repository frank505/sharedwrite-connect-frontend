import { Provider } from "react-redux";
import { store } from "../../store/store";
import Login from "./Login";
import { render, fireEvent,
  waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import Cookies from "js-cookie";
import { LOGIN_ADMIN_MUTATION } from "../../Graphql/Auth/Mutations";



const mockHistoryPush = jest.fn();





jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));




const mocks = [
  {
    request: {
      query: LOGIN_ADMIN_MUTATION,
      variables: {
        email: 'akpufranklin2@gmail.com',
        password: 'password',
      },
    },
    result: {
      data: {
        loginAdmin: {
          success:true,
          token:'dfgfdsaAEWSDSZCVV?.',
          errorStatus:null,
          error:null,
          message:'login successful'
        },
      },
    },
  },
];



const renderComponent = () =>
{
  const Comp =  render(

    <Provider store={store} >
    <MockedProvider mocks={mocks} addTypename={false} >
    <Login/>
    </MockedProvider>
    </Provider>
    );

    return Comp;
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
 });

 });


it('submits form and login failed', async() =>
{

  const {loginEmail,loginPassword,formLoginContainer,responseLoginDiv } = await setup();
  userEvent.type(loginEmail,'akpufranklin2@gmail.com');
  userEvent.type(loginPassword,'pass');
  fireEvent.submit(formLoginContainer);
  await waitFor(()=>{
    expect(responseLoginDiv.innerHTML).not.toBe('');
   });


})

  });
