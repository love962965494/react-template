import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Page404 from '../components/errorPages/404'
import App from './App'
import Login from './login/Login'

const redirectToApplicationBaseInfo = () => <Redirect to="app/dashboard" push={true} />

export default class Page extends Component {
  public render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" render={redirectToApplicationBaseInfo} />
          <Route path="/app" component={App} />
          <Route path="/login" component={Login} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    )
  }
}
