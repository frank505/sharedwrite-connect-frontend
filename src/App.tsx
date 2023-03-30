import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { HashRouter, Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { JWT_TOKEN_KEY } from './constants'
import { Gaurd } from './gaurd/Gaurd'
import './scss/style.scss'
import 'font-awesome/css/font-awesome.min.css'

// Cookies.remove(JWT_TOKEN_KEY);

export const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout: React.FunctionComponent<RouteComponentProps> = React.lazy(
  () => import('./layout/DefaultLayout'),
)

// Pages
const Login: React.FunctionComponent<RouteComponentProps> = React.lazy(
  () => import('./views/login'),
)
const ForgotPassword: React.FunctionComponent<RouteComponentProps> = React.lazy(
  () => import('./views/forgotpassword'),
)
const ResetPassword: React.FunctionComponent<RouteComponentProps> = React.lazy(
  () => import('./views/resetpassword'),
)
const Register: React.FunctionComponent<RouteComponentProps> = React.lazy(
  () => import('./views/register'),
)
const Page404: React.FunctionComponent<RouteComponentProps> = React.lazy(
  () => import('./views/pages/page404/Page404'),
)
const Page500: React.FunctionComponent<RouteComponentProps> = React.lazy(
  () => import('./views/pages/page500/Page500'),
)

const VerifyPasscode: React.FunctionComponent<RouteComponentProps> = React.lazy(
  () => import('./views/verify-passcode/VerifyPasscode'),
)

const App: React.FunctionComponent = () => {
  return (
    <div data-testid="app-data-id">
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/register" component={Register} />
            <Route exact={true} path="/verify-passcode" component={VerifyPasscode} />
            <Route exact={true} path="/forgot-password" component={ForgotPassword} />
            <Route exact={true} path="/reset-password" component={ResetPassword} />
            <Route exact={true} path="/404" component={Page404} />
            <Route exact={true} path="/500" component={Page500} />
            <Gaurd
              path="/"
              name="Home"
              Token={JWT_TOKEN_KEY}
              routeRedirect="/login"
              Component={DefaultLayout}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    </div>
  )
}

export default App
