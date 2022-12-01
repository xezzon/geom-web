import { METHOD, adminInstance } from './request'

/**
 * @typedef {object} User 用户基本账号信息
 * @property {string} username 用户名
 * @property {string} cipher 密码
 * @property {string} nickname 昵称
 */
/**
 * @typedef {object} Token
 * @property {string} tokenName
 * @property {string} tokenValue
 */

/**
 * 用户登录
 * @param {{ username: string, cipher: string }} params
 * @return {Promise<Token>}
 */
export async function login(params) {
  return adminInstance.request({
    url: '/login',
    method: METHOD.POST,
    body: params,
  })
}

/**
 * 获取当前登录用户的账号信息
 * @return {Promise<User>}
 */
export async function getCurrentUser() {
  return adminInstance.request({
    url: '/me',
    method: METHOD.GET,
  })
}
