import Cookies from 'js-cookie'

const TokenKey = 'management_token'
const LoginNameKey = 'LoginNameKey'

export const getToken = () => {
  return Cookies.get(TokenKey)
}

export const getLoginName = () => {
  return Cookies.get(LoginNameKey)
}

export const setToken = (token: string) => {
  return Cookies.set(TokenKey, token)
}

export const setLoginName = (loginName: string) => {
  return Cookies.set(LoginNameKey, loginName)
}

export const removeToken = () => {
  return Cookies.remove(TokenKey)
}

export const removeLoginName = () => {
  return Cookies.remove(LoginNameKey)
}

export default Cookies
