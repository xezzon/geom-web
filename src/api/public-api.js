import request, { METHOD } from './request'

/**
 * @typedef {object} PublicApi
 * @property {string} id
 * @property {string} url 调用地址
 * @property {string} name 接口名称
 * @property {PublicApiType} type 接口类型
 * @property {boolean} enabled 是否启用
 * @property {string} ownerId 所属用户组
 */
/**
 * 开放接口类型枚举
 * @readonly
 * @enum {string}
 */
// eslint-disable-next-line no-unused-vars
const PublicApiType = {
  RPC: 'RPC',
  WEBHOOK: 'WEBHOOK',
}

/**
 * 获取列表
 * @param {object} params 请求参数
 * @returns {Promise<PublicApi[]>}
 */
export async function list(params = {}) {
  return request({
    url: '/public-api',
    method: METHOD.GET,
    params,
  }).then((response) => response.json())
}
