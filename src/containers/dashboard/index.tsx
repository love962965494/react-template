import React, { Component } from 'react'
import Button from './components/button/Button'
import Span from './components/span/Span'

export default class Dashboard extends Component {
  const test = 123

  public render() {
    return (
      <div>
        我是首页
        <Span />
    <Button />
      </div>
    )
  }
}
