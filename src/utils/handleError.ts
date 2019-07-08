import { message } from 'antd'
import { isObject } from 'lodash'

const handleError = (error: string | { message: string }) => {
  if (!error) {
    return
  }
  if (isObject(error)) {
    if (error.message === 'Network Error') {
      message.error('网络出错了，请检查你的网络连接')
    } else if (error.message && error.message.indexOf('timeout') !== -1) {
      message.error('服务器请求超时，请稍后再试')
    } else {
      message.error('接口出错了，请联系管理员或者稍后重试', 2)
    }
  } else {
    message.error(error, 2)
  }
}

export default handleError