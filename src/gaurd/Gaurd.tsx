import React from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import Cookies from 'js-cookie'

export interface IGaurd {
  Component: React.FunctionComponent<RouteComponentProps>
  Token: any
  routeRedirect: string
  name: string
  path: string
  rest?: any
}

export const Gaurd: React.FC<IGaurd> = ({
  Component,
  Token,
  routeRedirect,
  name,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      Cookies.get(Token) ? <Component {...props} /> : <Redirect to={routeRedirect} />
    }
  />
)
