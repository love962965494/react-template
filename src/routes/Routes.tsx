import React, { Component, ComponentClass } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { getToken } from '../utils/token'
import RouteConfig, { IRouteConfig, IRouteItemConfig } from './config'

/**
 * 重定向到登陆页
 * @return {ReactComponent} Redirect
 */
const redirectToLogin = () => <Redirect to="/login" />

const requireLogin = (routeComponent: ComponentClass) => {
  const token = getToken()
  if (!token) {
    return redirectToLogin
  }
  return routeComponent
}

const renderRouteItem = (path: string, route: IRouteItemConfig): any => {
  const routePath = path + route.path

  if (route.children && route.children.length) {
    return route.children.map((child) => renderRouteItem(routePath, child))
  } else {
    return <Route key={route.id} exact={true} path={routePath} component={requireLogin(route.component)} />
  }
}

const renderRoutes = (routes: IRouteConfig) => {
  return (
    <Switch>
      {Object.keys(routes).map((key) => routes[key].map((route: IRouteItemConfig) => renderRouteItem('', route)))}
    </Switch>
  )
}

export default class Routes extends Component {
  public render () {
    return renderRoutes(RouteConfig)
  }
}
