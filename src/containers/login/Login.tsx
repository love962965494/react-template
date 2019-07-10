import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { LoginStoreContext } from 'stores/login'
import { setToken } from 'utils/token'
import { WrappedLoginForm } from './components/Login'

const Login = observer((props: RouteComponentProps) => {
  const store = useContext(LoginStoreContext)
  const { handleFieldsChange } = store
  const { fields } = store.state

  const handleLoginBtnClick = () => {
    setToken('测试')
    props.history.push('/')
  }

  return (
    <WrappedLoginForm
      {...fields}
      onChange={handleFieldsChange}
      onLoginBtnClick={handleLoginBtnClick}
    />
  )
})

export const LoginWithRouter = withRouter(Login)
