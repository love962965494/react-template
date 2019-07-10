import { ComponentClass } from 'react'

// tslint:disable-next-line: no-var-requires
const importModule = require('./__import__' + process.env.NODE_ENV).default

export interface IRouteItemConfig {
  id: string
  title: string
  path: string
  component: ComponentClass
  children?: IRouteItemConfig[]
}

export interface IRouteConfig {
  menus: IRouteItemConfig[]
  nonMenus: IRouteItemConfig[]
}

/**
 * @description:
 *   异步路由，需要用户登录后才可访问的路由
 * @param:
 *   menus -- 菜单相关的路由
 *   nonMenus -- 非菜单相关的路由
 *   {
 *     path -- 路由路径
 *     id -- 路由id
 *     title -- 菜单名称
 *     component -- 相关组件
 *     children -- 子路由
 *   }
 */
const RouteConfig: IRouteConfig = {
  menus: [
    {
      id: '01',
      path: '/app/dashboard',
      title: '首页',
      component: importModule('dashboard/Dashboard')
    }
  ],
  nonMenus: []
}

export default RouteConfig
