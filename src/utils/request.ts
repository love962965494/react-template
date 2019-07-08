import { message } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import { cloneDeep } from 'lodash'
import qs from 'qs'
import { requestDateFormat } from './dateFormat'
import handleError from './handleError'
import { getToken, removeToken } from './token'

const baseURL = process.env.NODE_ENV === 'production' ? '/nbiot-sanitation' : ''
const service = axios.create({
  baseURL,
  timeout: 15000
})

service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = 'sanitation' + getToken()
    }

    return config
  },
  (error) => {
    return handleError(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      if (+response.data.code === 10000) {
        if (getToken()) {
          removeToken()
          message.error(response.data.data, 3, () => {
            window.location.reload()
          })
        }
        return Promise.reject('token过期')
      }
    }
    return response
  },
  (error) => {
    return handleRequestError(error)
  }
)

/**
 * 处理请求错误
 *
 * @param {*} error
 * @returns
 */
const handleRequestError = (error: any) => {
  let resolvedError = cloneDeep(error)

  // error is null when response.data.data === null
  if (!error) {
    return Promise.reject(error)
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    handleError(error)
    resolvedError = ''
  } else if (error.message) {
    // Something happened in setting up the request that triggered an Error
    handleError(error)
    resolvedError = ''
  }

  return Promise.reject(resolvedError)
}

/**
 * 发送数据请求
 *
 * @param {string} requestType
 * @param {AxiosRequestConfig} requestConfig
 * @returns
 */
const sponsorRequest = (requestType: string, requestConfig?: AxiosRequestConfig) => {
  return (url: string, ...params: any[]) => {
    const requestParams = params.reduce((paramJson, param) => Object.assign(paramJson, param), {})
    const paramsType = requestType === 'get' ? 'params' : 'data'

    const config = Object.assign(
      {},
      {
        method: requestType,
        url,
        [paramsType]: requestParams,
        paramsSerializer: (serializaParmas: any) =>
          qs.stringify(serializaParmas, {
            serializeDate: (date) => requestDateFormat(date)
          })
      },
      requestConfig
    )

    requestParams.rand = Math.random()

    return service(config)
  }
}

/**
 * 处理请求重复
 *
 * @param {(...params: any[]) => Promise<any>} sponsorRequestByType
 * @returns
 */
const handleRepeatRequest = (sponsorRequestByType: (url: string, ...params: any[]) => Promise<any>) => {
  let hasSponsor = false
  let lastUrl = ''

  return async (url: string, ...params: any[]) => {
    const nowUrl = JSON.stringify(params)
    if (!hasSponsor || lastUrl !== nowUrl) {
      lastUrl = nowUrl
      hasSponsor = true
      try {
        const response = await sponsorRequestByType(url, ...params)
        hasSponsor = false
        lastUrl = ''
        return response
      } catch (err) {
        hasSponsor = false
        lastUrl = ''
        return Promise.reject(err)
      }
    } else {
      return Promise.reject('请求正在处理中，请勿重复提交请求！')
    }
  }
}

/**
 * 发送get请求
 *
 * @param {string} url
 * @param {...any[]} params
 * @returns
 */
const requestByGet = async (url: string, ...params: any[]) => {
  const sponsorRequestByGet = sponsorRequest('get')

  try {
    const response = await sponsorRequestByGet(url, ...params)
    if (response && response.data) {
      if (+response.data.code === 0) {
        return Promise.resolve(response.data.data)
      } else {
        return Promise.reject(response.data.data)
      }
    }
    return Promise.reject(response)
  } catch (error) {
    return handleRequestError(error)
  }
}

const requestByGetWithNoRepeat = handleRepeatRequest(requestByGet)

/**
 * 发送post请求
 *
 * @param {string} url
 * @param {...any[]} params
 * @returns
 */
const requestByPost = async (url: string, ...params: any[]) => {
  const sponsorRequestByPost = sponsorRequest('post')

  try {
    const response = await sponsorRequestByPost(url, ...params)
    if (response && response.data) {
      if (+response.data.code === 0) {
        return Promise.resolve(response.data.data)
      } else {
        return Promise.reject(response.data.data)
      }
    }
    return Promise.reject(response)
  } catch (error) {
    return handleRequestError(error)
  }
}

const requestByPostWithNoRepeat = handleRepeatRequest(requestByPost)

/**
 * 处理delete请求
 *
 * @param {string} url
 * @param {...any} params
 * @returns
 */
const requestByDelete = async (url: string, ...params: any) => {
  const sponsorRequestByDelete = sponsorRequest('delete')

  try {
    const response = await sponsorRequestByDelete(url, ...params)
    if (response && response.data) {
      if (+response.data.code === 0) {
        return Promise.resolve(response.data.data)
      } else {
        return Promise.reject(response.data.data)
      }
    }
    return Promise.reject(response)
  } catch (error) {
    return handleRequestError(error)
  }
}

const requestByDeleteWithNoRepeat = handleRepeatRequest(requestByDelete)

/**
 * 请求下载excel方法
 *
 * @param {*} url
 * @param {*} params
 * @returns
 */
const requestDownloadExcel = async (url: string, ...params: any[]) => {
  const sponsorRequestDownloadExcel = sponsorRequest('get', {
    responseType: 'arraybuffer'
  })

  try {
    const response = await sponsorRequestDownloadExcel(url, ...params)
    const blob = new Blob([response.data], {
      type: 'application/vnd.ms-excel;charset=utf-8'
    })
    let filename = response.headers['content-disposition'].split('filename=')[1]
    if ('msSaveOrOpenBlob' in navigator) {
      window.navigator.msSaveOrOpenBlob(blob, filename + '.xls')
    } else {
      const downloadElement = document.createElement('a')
      const downloadUrl = window.URL.createObjectURL(blob)
      filename = decodeURIComponent(filename)
      downloadElement.href = downloadUrl
      downloadElement.download = filename + '.xls'
      document.body.appendChild(downloadElement)
      downloadElement.click()
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
      }, 0)
    }
    
    return Promise.resolve({ data: 'success' })
  } catch (error) {
    return handleRequestError(error)
  }
}

const requestDownloadExcelWithNoRepeat = handleRepeatRequest(requestDownloadExcel)

/**
 * 请求下载文件方法
 *
 * @param {*} url
 * @param {*} params
 * @returns
 */
const requestDownloadFile = async (url: string, ...params: any[]) => {
  const sponsorRequestDownloadFile = sponsorRequest('get', {
    responseType: 'blob'
  })

  try {
    const response = await sponsorRequestDownloadFile(url, ...params)
    if (!response.headers['content-disposition']) {
      return Promise.reject('文件不存在')
    }
    const blob = new Blob([response.data])
    let filename = response.headers['content-disposition'].split('filename=')[1]
    if ('msSaveOrOpenBlob' in navigator) {
      window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
      const downloadElement = document.createElement('a')
      const downloadUrl = window.URL.createObjectURL(blob)
      filename = decodeURIComponent(filename)
      downloadElement.href = downloadUrl
      downloadElement.download = filename
      document.body.appendChild(downloadElement)
      downloadElement.click()
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
      }, 0)
    }
    return Promise.resolve({ data: 'success' })
  } catch (error) {
    return handleRequestError(error)
  }
}

const requestDownloadFileWithNoRepeat = handleRepeatRequest(requestDownloadFile)

export {
  baseURL,
  requestByGetWithNoRepeat as requestByGet,
  requestByPostWithNoRepeat as requestByPost,
  requestByDeleteWithNoRepeat as requestByDelete,
  requestDownloadExcelWithNoRepeat as requestDownloadExcel,
  requestDownloadFileWithNoRepeat as requestDownloadFile
}
