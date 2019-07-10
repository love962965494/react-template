import { requestByPost } from 'utils/request'

const loginApi = {
  login: (params: { username: string; password: string }) =>
    requestByPost('', params)
}

export default loginApi
