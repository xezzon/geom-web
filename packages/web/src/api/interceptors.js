import { redirect } from 'react-router-dom'
import { message as messageApi } from 'antd';

/**
 * 添加权限请求头
 */
function tokenRequest(config) {
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
function unauthorizedResponse(response) {
  if (response.status === 401) {
    redirect('/login')
  }
  return response
}

/**
 * 通用异常结构，输出错误到控制台并提示
 * @param {Response} response
 */
function failedResponsePrompt(response) {
  response.clone().json()
    .then((resBody) => {
      const { code, message } = resBody
      if (code && message) {
        console.log(resBody)
        messageApi.error(message)
      }
    })
  return response
}

export {
  tokenRequest,
  unauthorizedResponse,
  failedResponsePrompt,
}
