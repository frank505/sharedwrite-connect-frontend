import { GET_USER_TYPE_LIST } from "../../../Graphql/Query/UserType";
import { render, fireEvent,
  waitFor,
  cleanup} from "@testing-library/react";
import TestRenderer, { act } from 'react-test-renderer'; // ES6
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import ViewUserType from "./ViewUserType";
import { GraphQLError } from "graphql";



const mockHistoryPush = jest.fn();





jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));




const mocks:any = [
  {
    request: {
      query: GET_USER_TYPE_LIST,
      variables: {
       per_page: '4',
        curr_page: '1',
      },
    },
   loading:false,
    result: {
      data: {
        getUserTypeList: {
          success:true,
            data:{
              first_page:1,
              last_page:1,
              total:4,
              per_page:4,
              current_page:1,
              data:[
                {
                created_at: "1649706783041",
                id: "7",
                type: "maduka",
                type_icon: "mq11649723380692.jpeg",
                updated_at: "1649694580747",
              },
              {
                created_at: "1649706783041",
                id: "6",
                type: "maduka",
                type_icon: "mq11649723380692.jpeg",
                updated_at: "1649694580747",
              },
              {
                created_at: "1649706783041",
                id: "5",
                type: "maduka",
                type_icon: "mq11649723380692.jpeg",
                updated_at: "1649694580747",
              },
              {
                created_at: "1649706783041",
                id: "4",
                type: "maduka",
                type_icon: "mq11649723380692.jpeg",
                updated_at: "1649694580747",
              },
            ]
            },
            message:'created successfully',
            file_url:'./ssss/',
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
    <ViewUserType/>
    </MockedProvider>
    </Provider>
    );

    return Comp;
}



const setup = () =>
{
  const {findByTestId,getByTestId,container,queryByTestId} =  renderComponent();


  return {
   findByTestId,
   getByTestId,
   container,
   queryByTestId
  }

}



describe('view user types', ()=>
{


  // afterEach(()=>{
  //    jest.clearAllMocks();
  //    cleanup();
  //  })




   it('renders component properly',async()=>
   {

    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ViewUserType/>
      </MockedProvider>,
    );

    //  await new Promise(resolve => setTimeout(resolve, 0));
     act(()=>  console.log(component.root.findByProps({className:'data-id'})))



  //   await  waitFor(()=>{
  //     setup();
  //   });

  //   const {container} = setup();


  //   // await new Promise(resolve => setTimeout(resolve, 0));
  // // expect(queryByTestId('table-content-viewuser')).not.toBeNull()
  //   console.log(container.innerHTML);

   });


})
