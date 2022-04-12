import { CreateUserType } from "..";
import { CREATE_USER_TYPE } from "../../../Graphql/Mutations/UserType";
import { render, fireEvent,
  waitFor,
  cleanup} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../../store/store";



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
      query: CREATE_USER_TYPE,
      variables: {
        type: 'desmond',
        type_icon: {name:'desmond.png',size:232332,mime:"image/png"},
      },
    },
    result: {
      data: {
        createUserType: {
          success:true,
          token:null,
          errorStatus:null,
          error:null,
          message:'created successfully'
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
    <CreateUserType/>
    </MockedProvider>
    </Provider>
    );

    return Comp;
}



const setup = async() =>
{
  const {findByTestId} = renderComponent();
  const formRoot  = await findByTestId('form-create-user-type');
  const userTypeTextArea = await findByTestId('user-type-name');
  const userTypeValidation = await findByTestId('user-type-validation');
  const iconTypeFile = await findByTestId('type_icon_file');
  const iconTypeValidation = await findByTestId('type_icon_validation');
  const btnSubmitUserTypeValidation = await findByTestId('btn-submit-user-type-form');

  return {
    formRoot,
    userTypeTextArea,
    userTypeValidation,
    iconTypeFile,
    iconTypeValidation,
    btnSubmitUserTypeValidation
  }

}



describe('create user type tests', ()=>
{
  let file:any;


  beforeEach(()=>{
   // useDispatchSpy.mockClear();
   file = new File(['(⌐□_□)'], 'desmond.png', { type: 'image/png' });
   })


  afterEach(()=>{

   //  useDispatchSpy.mockClear();
    jest.resetAllMocks();
    cleanup();
  })

   it('renders component properly',()=>
   {
     renderComponent();
   });

   it('validate form input', async()=>
   {
       const {userTypeTextArea,userTypeValidation,
        iconTypeFile,iconTypeValidation,btnSubmitUserTypeValidation,formRoot} = await setup();
      /**submit form when input is not entered  */
       fireEvent.submit(formRoot);
      await waitFor(()=>{
        expect(iconTypeValidation.innerHTML).not.toBe('');
      })

        userEvent.type(userTypeTextArea, 'sss');
        fireEvent.change(iconTypeFile,{
          target:{files: [file]}
        });

       /**submit form once input element is correctly entered */
        fireEvent.submit(formRoot);

        await waitFor(()=>{
          expect(iconTypeValidation.innerHTML).toBe('');
          expect(userTypeValidation.innerHTML).toBe('');
        })
   });


   it('submits form' , async()=>
   {
    const {userTypeTextArea,userTypeValidation,
      iconTypeFile,iconTypeValidation,btnSubmitUserTypeValidation,formRoot} = await setup();
      userEvent.type(userTypeTextArea, 'desmond');
      fireEvent.change(iconTypeFile,{
        target:{files: [file]}
      });
      fireEvent.submit(formRoot);

      await waitFor(()=>{
        expect(iconTypeValidation.innerHTML).toBe('');
        expect(userTypeValidation.innerHTML).toBe('');
      })


   });



})
