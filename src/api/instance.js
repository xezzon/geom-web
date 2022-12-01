import { redirect } from 'react-router-dom'
import { create } from './request'

/* --------- 拦截器 --------- */

/**
 * 添加权限请求头
 */
function tokenRequestInterceptor(config) {
  const { headers } = config
  const tokenName = localStorage.getItem('tokenName')
  let tokenValue = localStorage.getItem('tokenValue') || sessionStorage.getItem('tokenValue')
  if (tokenName && tokenValue) {
    tokenValue = JSON.parse(tokenValue)
    headers[tokenName] = `Bearer ${tokenValue}`
  }
  return {
    ...config,
    headers,
  }
}

/**
 * 401响应重定向至登录页码
 * @param {Response} response
 */
function unauthorizedResponseInterceptor(response) {
  if (response.status === 401) {
    redirect('/login')
  }
  return response
}

/* --------- 服务请求实例 --------- */

const adminInstance = create()
adminInstance.interceptors.request.use(tokenRequestInterceptor)
adminInstance.interceptors.response.use(unauthorizedResponseInterceptor)

export { adminInstance }
