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
      component: importModule('dashboard/index')
    },
    {
      id: '02',
      path: '/app/transactionRecords',
      title: '交易记录',
      component: importModule('dashboard/index'),
      children: [
        {
          id: '021',
          path: '/transactionOrders',
          title: '交易订单',
          component: importModule('dashboard/index')
        },
        {
          id: '022',
          path: '/refundOrders',
          title: '退款订单',
          component: importModule('dashboard/index')
        },
        {
          id: '023',
          path: '/withdrawalOrders',
          title: '提现订单',
          component: importModule('dashboard/index')
        }
      ]
    },
    {
      id: '03',
      path: '/app/marketingManage',
      title: '营销管理',
      component: importModule('dashboard/index')
    },
    {
      id: '04',
      path: '/app/fundSettlement',
      title: '资金结算',
      component: importModule('dashboard/index')
    },
    {
      id: '05',
      path: '/app/merchantsInfo',
      title: '商户资料',
      component: importModule('dashboard/index')
    },
    {
      id: '06',
      path: '/app/merchantsAccess',
      title: '商户接入',
      component: importModule('dashboard/index')
    }
  ],
  nonMenus: []
}

export default RouteConfig