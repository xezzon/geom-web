import qs from 'qs'
import { redirect } from 'react-router-dom'

/**
 * Enum for HTTP Request Method
 * @readonly
 * @enum {string}
 */
const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
}

/**
 * 封装 fetch 请求
 * @param {RequestInfo | { url: string, method: METHOD }} config
 */
const request = (config) => Promise.resolve(config)
  .then((config) => {
    const baseURL = '/api'
    let { url, headers, body } = config
    /* 组装 baseUrl */
    url = `${config.baseURL || baseURL}${config.url}`
    /* 解析查询参数 */
    let searchParams = ''
    if (config.params) {
      searchParams += config.url.includes('?') ? '&' : '?'
      searchParams += qs.stringify(config.params, {
        arrayFormat: 'comma',
        allowDots: true,
        format: 'RFC1738',
        encoder: encodeURI,
      })
      console.debug(searchParams)
    }
    url = `${url}${searchParams}`
    /* 解析 content-type 与 data */
    if (!headers) {
      headers = {}
    }
    if (!headers['content-type']) {
      headers['content-type'] = 'application/json'
    }
    if (headers['content-type'] === 'application/json') {
      body = JSON.stringify(config.body)
    }
    /* 添加权限请求头 */
    const tokenName = localStorage.getItem('tokenName')
    let tokenValue = localStorage.getItem('tokenValue') || sessionStorage.getItem('tokenValue')
    if (tokenName && tokenValue) {
      tokenValue = JSON.parse(tokenValue)
      headers[tokenName] = `Bearer ${tokenValue}`
    }
    // request interceptors

    return {
      ...config,
      url,
      headers,
      body,
    }
  })
  .then(({ url, ...options }) => fetch(url, options))
  .then((response) => {
    if (!response.ok) {
      if (response.status === 401) {
        redirect('/login')
      }
      return Promise.reject(response)
    }
    // response interceptors

    return response
  })

export default request
export { METHOD }
