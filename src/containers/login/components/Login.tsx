import { Form, Input, Row } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React, { FormEvent, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ILoginFieldsProps } from 'stores/login'
import './login.scss'

const FormItem = Form.Item

interface IOwnProps extends ILoginFieldsProps, FormComponentProps {
  onChange: (changedFields: ILoginFieldsProps) => void
  onLoginBtnClick: () => void
}

function Login(props: IOwnProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    props.form.validateFields(err => {
      if (!err) {
        props.onLoginBtnClick()
      }
    })
  }

  const handleKeyDown = ($ev: KeyboardEvent<HTMLFormElement>) => {
    if ($ev.keyCode === 13) {
      props.form.validateFields(err => {
        if (!err) {
          props.onLoginBtnClick()
        }
      })
    }
  }

  const { getFieldDecorator } = props.form

  return (
    <Form onKeyDown={handleKeyDown}>
      <h3 styleName="form-title">用户登录</h3>
      <FormItem htmlFor="username" label="账户">
        {getFieldDecorator('username', {
          rules: [
            { required: true, message: '请输入用户名！' },
            { min: 6, message: '用户名长度不能少于6位！' },
            { max: 16, message: '用户名长度不能超过16位！' }
          ]
        })(<Input id="username" />)}
      </FormItem>
      <FormItem htmlFor="password" label="密码">
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: '请输入密码！' },
            { min: 6, message: '密码长度不能少于6位！' },
            { max: 16, message: '密码长度不能超过16位！' }
          ]
        })(<Input type="password" id="password" />)}
      </FormItem>
      <Row type="flex" justify="space-between">
        <Link styleName="sign-up" to="/login/signUp">
          立即注册
        </Link>
        <Link styleName="forget-password" to="/login/forgetPassword">
          忘记密码
        </Link>
      </Row>
      <Row>
        <button type="button" onClick={handleSubmit}>
          登陆
        </button>
      </Row>
    </Form>
  )
}

const WrappedLoginForm = Form.create<IOwnProps>({
  onFieldsChange(props, changedFields: ILoginFieldsProps) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField(props.username),
      password: Form.createFormField(props.password)
    }
  }
})(Login)

export { WrappedLoginForm }
