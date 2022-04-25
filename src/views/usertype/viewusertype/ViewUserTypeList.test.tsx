import { GET_USER_TYPE_LIST } from "../../../Graphql/Query/UserType";
import { render, fireEvent,
  waitFor,
  cleanup} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import ViewUserType from "./ViewUserType";
import { GraphQLError } from "graphql";
import { ViewUserTypeList } from "./ViewUserTypeList";



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

    result: {
      errors: [new GraphQLError('Error!')],
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
    <ViewUserTypeList
       fileUrl={mocks[0].result.data.getUserTypeList.file_url}
       activePage={mocks[0].result.data.getUserTypeList.data.current_page}
       itemsCountPerPage={mocks[0].result.data.getUserTypeList.data.current_page}
       totalItemsCount={mocks[0].result.data.getUserTypeList.data.total}
       loadPageItem={jest.fn()}
       responseData={mocks[0].result.data.getUserTypeList.data.data}
       />
    </MockedProvider>
    </Provider>
    );

    return Comp;
}



const setup = () =>
{
  const {findByTestId,getByTestId,container,queryByTestId} = renderComponent();


  return {
   findByTestId,
   getByTestId,
   container,
   queryByTestId
  }

}



describe('view user types', ()=>
{


  afterEach(()=>{
     jest.clearAllMocks();
     cleanup();
   })

   it('pagination onchange button is clicked',async()=>
   {
    const  {queryByTestId} = setup();
    expect(queryByTestId('table-content-viewuser')).not.toBeNull();
   });


})
