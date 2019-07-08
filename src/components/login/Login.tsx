import { Button, Form, Input, Row } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React, { Component, FormEvent, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ILoginFormFields } from '../../containers/login/Login'

const FormItem = Form.Item

const StyledFormTitle = styled.h3`
  margin-bottom: 4rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #60a8fa;
`

const StyledSignUp = styled(Link)`
  font-size: 1.2rem;
  color: #0080ff;

  &:hover {
    color: #0080ff;
  }
`

const StyledForgetPassword = styled(Link)`
  font-size: 1.2rem;
  color: #f3961d;

  &:hover {
    color: #f3961d;
  }
`

// const StyledLoginButton = styled(Button as ComponentProps<any>)`
//   && {
//     margin-top: 3rem;
//     width: 12.75rem;
//     height: 3.7rem;
//     vertical-align: -1rem;
//     border-radius: 0;
//     border: none;
//     box-shadow: none;
//     font-size: 1.2rem;
//     background-size: cover;

//     > span {
//       vertical-align: 0.9rem;
//     }
//   }
// `

interface IOwnProps extends ILoginFormFields, FormComponentProps {
  onChange: (changedFields: object) => void
  onLoginBtnClick: () => void
}

class Login extends Component<IOwnProps> {
  public handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err) => {
      if (!err) {
        this.props.onLoginBtnClick()
      }
    })
  }

  public handleKeyDown = ($ev: KeyboardEvent<HTMLFormElement>) => {
    if ($ev.keyCode === 13) {
      this.props.form.validateFields((err) => {
        if (!err) {
          this.props.onLoginBtnClick()
        }
      })
    }
  }

  public render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onKeyDown={this.handleKeyDown}>
        <StyledFormTitle>用户登录</StyledFormTitle>
        <FormItem id="username" label="账户">
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名！' },
              { min: 6, message: '用户名长度不能少于6位！' },
              { max: 16, message: '用户名长度不能超过16位！' }
            ]
          })(<Input id="username" />)}
        </FormItem>
        <FormItem id="password" label="密码">
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码！' },
              { min: 6, message: '密码长度不能少于6位！' },
              { max: 16, message: '密码长度不能超过16位！' }
            ]
          })(<Input type="password" id="password" />)}
        </FormItem>
        <Row type="flex" justify="space-between">
          <StyledSignUp to="/login/signUp">立即注册</StyledSignUp>
          <StyledForgetPassword to="/login/forgetPassword">忘记密码</StyledForgetPassword>
        </Row>
        <Row>
          <button type="button" onClick={this.handleSubmit}>登陆</button>
        </Row>
      </Form>
    )
  }
}

const WrappedLoginForm = Form.create<IOwnProps>({
  onFieldsChange (props, changedFields: object) {
    props.onChange(changedFields)
  },
  mapPropsToFields (props) {
    return {
      username: Form.createFormField(props.username),
      password: Form.createFormField(props.password)
    }
  }
})(Login)

export default WrappedLoginForm
