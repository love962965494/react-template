import { ReactComponent as CompanyLogo } from 'assets/dashboard/bank.svg'
import logo from 'assets/dashboard/logo.png'
import { ReactComponent as UserLogo } from 'assets/dashboard/user.svg'
import React from 'react'
import { Menus } from '../menus'
import './header.scss'

function Header() {
  return (
    <header styleName="header">
      <img styleName="logo" src={logo} alt="长虹logo" />
      <Menus />
      <span styleName="company">
        <CompanyLogo /> <span>云游互联科技有限公司</span>
      </span>
      <span styleName="user">
        <UserLogo /> <span>yunyou</span>
      </span>
    </header>
  )
}

export { Header }
