import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import LoginComponent from '../../components/login/Login'
import { setToken } from '../../utils/token'

export interface ILoginFormFields {
  username: {
    value: string
  }
  password: {
    value: string
  }
}

interface IOwnStateProps {
  fields: ILoginFormFields
}

class Login extends Component<RouteComponentProps> {
  public state: IOwnStateProps = {
    fields: {
      username: {
        value: '12345678'
      },
      password: {
        value: '12345678'
      }
    }
  }

  public handleFormFieldsChange = (changeFields: object) => {
    this.setState((prevState: IOwnStateProps) => {
      return {
        fields: { ...prevState.fields, ...changeFields }
      }
    })
  }

  public handleLoginBtnClick = () => {
    // const { username, password } = this.state.fields
    setToken('测试')
    this.props.history.push('/')
    // loginApi
    //   .login({
    //     username: username.value,
    //     password: password.value
    //   })
    //   .then((res) => {
    //     setToken(res.token)
    //     this.props.history.push('/')
    //   })
    //   .catch((error) => {
    //     handleError(error)
    //   })
  }

  public render () {
    const { fields } = this.state
    return (
      <LoginComponent {...fields} onChange={this.handleFormFieldsChange} onLoginBtnClick={this.handleLoginBtnClick} />
    )
  }
}

export default withRouter(Login)
