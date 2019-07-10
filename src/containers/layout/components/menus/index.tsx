import { Menu } from 'antd'
import React from 'react'
import RouteConfig, { IRouteItemConfig } from 'routes/config'
import './menus.scss'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

function Menus() {
  const renderMenuItem = (menu: IRouteItemConfig) => {
    if (menu.children && menu.children.length > 0) {
      return (
        <SubMenu key={menu.id} title={menu.title}>
          {menu.children.map(child => renderMenuItem(child))}
        </SubMenu>
      )
    } else {
      return <MenuItem key={menu.id}>{menu.title}</MenuItem>
    }
  }

  const renderMenu = (menus: IRouteItemConfig[]) => {
    return (
      <Menu styleName="menu" mode="horizontal">
        {menus.map(menu => renderMenuItem(menu))}
      </Menu>
    )
  }

  return renderMenu(RouteConfig.menus)
}

export { Menus }
