import { message as messageApi } from "antd";

/**
 * 通用异常结构，输出错误到控制台并提示
 * @param {import('axios').AxiosError} error
 */
function failedResponsePrompt({ response }) {
  if (!response) {
    return Promise.reject(response)
  }
  if (response.status === 400) {
    const { code, message } = response.data
    if (code && message) {
      messageApi.error(message)
    }
  } else if (response.status === 500) {
    messageApi.error('服务器开小差了，请稍后重试。')
  }
  return Promise.reject(response)
}

export {
  failedResponsePrompt,
}