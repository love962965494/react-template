import React, { Component } from 'react'
import Content from './Content'
import Header from './Header'

export default class Layout extends Component {
  public render () {
    return (
      <>
        <Header />
        <Content />
      </>
    )
  }
}
