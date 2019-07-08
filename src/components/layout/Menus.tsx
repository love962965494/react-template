import { Menu } from 'antd'
import React, { Component } from 'react'
import styled from 'styled-components'
import RouteConfig, { IRouteItemConfig } from '../../routes/config'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

const StyledMenu = styled(Menu)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 42.8571rem;
  height: 100%;
`

export default class Menus extends Component {
  public renderMenuItem = (menu: IRouteItemConfig) => {
    if (menu.children && menu.children.length > 0) {
      return (
        <SubMenu key={menu.id} title={menu.title}>
          {menu.children.map((child) => this.renderMenuItem(child))}
        </SubMenu>
      )
    } else {
      return <MenuItem key={menu.id}>{menu.title}</MenuItem>
    }
  }

  public renderMenu = (menus: IRouteItemConfig[]) => {
    return <StyledMenu mode="horizontal">{menus.map((menu) => this.renderMenuItem(menu))}</StyledMenu>
  }

  public render () {
    return this.renderMenu(RouteConfig.menus)
  }
}
