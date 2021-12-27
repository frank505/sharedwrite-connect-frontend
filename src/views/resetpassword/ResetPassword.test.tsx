import { Provider } from "react-redux";
import { store } from "../../store/store";
import ResetPassword from "./ResetPassword";
import { render, fireEvent,
  waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import Cookies from "js-cookie";
import { ADMIN_CHANGE_PASSWORD } from "../../Graphql/Auth/Mutations";



const mockHistoryPush = jest.fn();


const mockUseLocationValue =
{
  pathname: '/reset-password',
  search: '',
  hash: '',
  state: {
    emailToResetPassword:'dddd@gmail.com'
  }
}


jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => (mockUseLocationValue)
}));




const mocks = [
  {
    request: {
      query: ADMIN_CHANGE_PASSWORD,
      variables: {
        code:'2424',
        password:'password',
        confirm:'password'
      },
    },
    result: {
      data: {
        adminChangePassword: {
          success:true,
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
    <ResetPassword/>
    </MockedProvider>
    </Provider>
    );

    return Comp;
}



const setup = async() =>
{
    const {findByTestId} = renderComponent();
    const resetPassword = await findByTestId('reset-password-root');
    const responseResetPasswordDiv = await findByTestId('responseResetPasswordDiv');
    const resetPasswordCode = await findByTestId('reset-password-code-form');
    const resetPasswordPassword = await findByTestId('reset-password-password-form');
    const resetPasswordConfirm = await findByTestId('reset-password-confirm-code-form');
    const resetPasswordCodeValidationResponse = await findByTestId('reset-password-code-validation-response');
    const resetPasswordPasswordValidationResponse = await findByTestId('reset-pasword-password-validation-response');
    const resetPasswordConfirmValidationResponse = await findByTestId('reset-password-confirm-validation-response');
   const formResetPasswordContainer = await findByTestId('form-reset-password-container');


    return {
      resetPassword,
      responseResetPasswordDiv,
     resetPasswordCode,
     resetPasswordPassword,
     resetPasswordConfirm,
     resetPasswordCodeValidationResponse,
     resetPasswordPasswordValidationResponse,
     resetPasswordConfirmValidationResponse,
     formResetPasswordContainer
    }


}


describe('Reset Password', () => {


   afterEach(()=>{;
     jest.resetAllMocks();
   })

    it('renders component properly',()=>
    {
      renderComponent();
    });


    it('validates input on form change', async()=>
    {

      const { resetPasswordCode,
        resetPasswordPassword,
        resetPasswordConfirm,
        resetPasswordCodeValidationResponse,
        resetPasswordPasswordValidationResponse,
        resetPasswordConfirmValidationResponse
         } = await setup();



         expect(resetPasswordCodeValidationResponse.innerHTML).not.toBe('');
         expect(resetPasswordPasswordValidationResponse.innerHTML).not.toBe('');
         expect(resetPasswordConfirmValidationResponse.innerHTML).not.toBe('');


          userEvent.type(resetPasswordCode,'2424');
          userEvent.type(resetPasswordPassword,'password');
          userEvent.type(resetPasswordConfirm,'confirm');
          await waitFor(()=>
          {
            expect(resetPasswordCodeValidationResponse.innerHTML).toBe('');
            expect(resetPasswordPasswordValidationResponse.innerHTML).toBe('');
            expect(resetPasswordConfirmValidationResponse.innerHTML).not.toBe('');
          });
    });


//  it('submit form and reset password was successful' ,async()=>{

//   const {
//    formResetPasswordContainer,
//    resetPasswordCode,
//    resetPasswordPassword,
//    resetPasswordConfirm,
//    responseResetPasswordDiv
//    } = await setup();
//   userEvent.type(resetPasswordCode,'2424');
//   userEvent.type(resetPasswordConfirm,'password');
//   userEvent.type(resetPasswordPassword,'password');

//  fireEvent.submit(formResetPasswordContainer);
//  await waitFor(()=>
//  {
//     expect(responseResetPasswordDiv).not.toBe('');
//  });

//  });


// it('submits form and login failed', async() =>
// {

//   const {
//     formResetPasswordContainer,
//     resetPasswordCode,
//     resetPasswordPassword,
//     resetPasswordConfirm,
//     responseResetPasswordDiv,
//     resetPasswordCodeValidationResponse,
//     resetPasswordConfirmValidationResponse,
//     resetPasswordPasswordValidationResponse
//   } = await setup();
//   userEvent.type(resetPasswordCode,'akpufranklin2@gmail.com');
//   userEvent.type(resetPasswordPassword,'pass');
//   userEvent.type(resetPasswordConfirm,'pass');
//   fireEvent.submit(formResetPasswordContainer);
//   await waitFor(()=>{
//     expect(resetPasswordCodeValidationResponse.innerHTML).not.toBe('');
//     expect(resetPasswordPasswordValidationResponse.innerHTML).not.toBe('');
//     expect(resetPasswordConfirmValidationResponse.innerHTML).not.toBe('');
//     expect(responseResetPasswordDiv.innerHTML).not.toBe('');
//    });


// })

  });
