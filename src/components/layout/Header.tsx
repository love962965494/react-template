import React, { Component } from 'react'
import styled from 'styled-components'
import { ReactComponent as CompanyLogo } from '../../assets/dashboard/bank.svg'
import logo from '../../assets/dashboard/logo.png'
import { ReactComponent as UserLogo } from '../../assets/dashboard/user.svg'
import Menus from './Menus'

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5714rem;
  box-shadow: 0px 0px 10px #ccc;
`

const Logo = styled.img`
  margin-right: 5em;
`

const Compony = styled.span`
  margin-right: 3em;

  > svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }

  > span {
    vertical-align: middle;
  }
`

const User = styled.span`
  > svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }

  > span {
    vertical-align: middle;
  }
`

export default class Header extends Component {
  public render () {
    return (
      <HeaderBar>
        <Logo src={logo} alt="长虹logo" />
        <Menus />
        <Compony>
          <CompanyLogo /> <span>云游互联科技有限公司</span>
        </Compony>
        <User>
          <UserLogo /> <span>yunyou</span>
        </User>
      </HeaderBar>
    )
  }
}
