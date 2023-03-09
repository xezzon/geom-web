import { adminInstance, METHOD } from './request';

/**
 * @typedef {object} Dict
 * @property {string} id
 * @property {string} tag 字典目
 * @property {string} code 字典值
 * @property {string} label 字典描述
 * @property {number} ordinal 排序号
 * @property {string} parentId 上级字典ID
 * @property {Dict[]} children
 */

/**
 * 标签列表
 */
export async function getTags() {
  return adminInstance.request({
    url: '/dict/tags',
    method: METHOD.GET,
  })
}

/**
 * 列表
 * @param {string} tag 字典目
 * @returns {Promise<Dict[]>}
 */
export async function list(tag) {
  return adminInstance.request({
    url: `/dict/${tag}`,
    method: METHOD.GET,
  })
}

/**
 * 新增
 * @param {Dict} dict 字典
 */
export async function add(dict) {
  return adminInstance.request({
    url: '/dict',
    method: METHOD.POST,
    body: dict,
  })
}
