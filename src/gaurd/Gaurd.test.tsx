import React from "react";
import { render, fireEvent, waitFor,screen} from "@testing-library/react";
import { Provider } from "react-redux";
import {store} from '../store/store'
import { HashRouter,  Route, Switch, Redirect,RouteComponentProps } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import * as ReactRedux from 'react-redux';
import Cookies from "js-cookie";
import { Gaurd } from "./Gaurd";
import '@testing-library/jest-dom'

const CompTest:React.FunctionComponent<RouteComponentProps> = () => <></>

const mockHistoryPush = jest.fn();


jest.mock('react-router-dom', () => (
  {
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),

}

)
);




const renderRoutesComponent = () =>
{

  const Comp =  render(
    <Provider store={store}>
         <MemoryRouter initialEntries={['/test','/login','/']} initialIndex={0}>
         <Gaurd Component={CompTest} path="/" name="Home" Token='medics-admin' routeRedirect="/login" />
         </MemoryRouter>
    </Provider>
    );

    return Comp;
}




describe('Gaurds test', () => {

it('mock token is present',async()=>
{
  let res:any = true;
  jest.spyOn(Cookies,'get').mockImplementationOnce(()=> res);
  renderRoutesComponent();
});

it('mocks token is absent', async()=>{
  let res:any = false;
  jest.spyOn(Cookies,'get').mockImplementationOnce(()=> res);
  renderRoutesComponent();

})

})
