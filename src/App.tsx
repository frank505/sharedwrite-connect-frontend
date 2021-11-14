import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { HashRouter , Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { JWT_TOKEN_KEY } from './constants';
import { Gaurd } from './gaurd/Gaurd';
import './scss/style.scss';




const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout:React.FunctionComponent<RouteComponentProps> = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login:React.FunctionComponent<RouteComponentProps>  = React.lazy(() => import('./views/login/Login'));
const Register:React.FunctionComponent<RouteComponentProps> = React.lazy(() => import('./views/register/Register'));
const Page404:React.FunctionComponent<RouteComponentProps>  = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500:React.FunctionComponent<RouteComponentProps>  = React.lazy(() => import('./views/pages/page500/Page500'));




const App:React.FunctionComponent = () =>
{



  return (
    <HashRouter>
    <React.Suspense fallback={loading}>
      <Switch>
        <Route exact={true} path="/login"  render={(props:any) => <Login {...props} />} />
        <Route
          exact={true}
          path="/register"
          render={(props) => <Register {...props} />}
        />

        <Route exact={true} path="/404"  render={(props:any) => <Page404 {...props} />} />
        <Route exact={true}   path="/500"  render={(props:any) => <Page500 {...props} />} />
        <Gaurd  path="/" name="Home" Token={JWT_TOKEN_KEY} routeRedirect="/login" Component={DefaultLayout} />
      </Switch>
    </React.Suspense>
  </HashRouter>
  )
}

export default App




