import { message as messageApi } from "antd";

/**
 * 通用异常结构，输出错误到控制台并提示
 * @param {import('axios').AxiosError} error
 */
function failedResponsePrompt({ response }) {
  if (!response) {
    return Promise.reject(response)
  }
  const { code, message } = response.data
  if (code && message) {
    console.log(response.data)
    messageApi.error(message)
  }
  return Promise.reject(response)
}

export {
  failedResponsePrompt,
}