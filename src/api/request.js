import qs from 'qs'
import { tokenRequest, unauthorizedResponse, failedResponsePrompt } from './interceptors';

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
 * @typedef InstanceConfig 请求实例配置
 * @property {string} baseURL 基础路径 请求地址为URI时有效
 * @property {Headers} headers 请求头
 * @property {(params: object) => string} paramsSerializer params序列化方法
 * @property {(data: any, headers: Headers) => any} transformRequest 拦截并修改请求体/请求头
 * @property {(data: Response) => any} transformResponse 拦截并修改响应
 */
/**
 * @typedef RequestConfig 请求配置
 * @type { InstanceConfig | RequestInfo }
 */

/**
 * 默认配置
 * @type {InstanceConfig}
 */
const defaultConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  paramsSerializer: (params = {}) => qs.stringify(params, {
    arrayFormat: 'comma',
    allowDots: true,
    format: 'RFC1738',
    encoder: encodeURI,
  }),
  transformRequest: (data, headers = {}) => {
    if (headers['Content-Type']?.includes('application/json')) {
      return JSON.stringify(data)
    }
    return data
  },
  transformResponse: (data) => data.json(),
}

/**
 * 拦截器组
 */
class Interceptors {
  constructor() {
    this.resolvers = []
  }

  /**
   * 新增拦截器
   * @param {Function} resolver
   */
  use(resolver) {
    if (!this.resolvers.includes(resolver)) {
      this.resolvers.push(resolver)
    }
    return resolver
  }

  /**
   * 移除拦截器
   * @param {object} resolver
   */
  eject(resolver) {
    const index = this.resolvers.findIndex((item) => item === resolver)
    this.resolvers.splice(index, 1)
  }

  exec(initialValue) {
    return this.resolvers.reduce((pre, curr) => curr(pre), initialValue)
  }
}

class RequestUrl {
  /**
   * @param {object} config
   * @param {string} config.url
   * @param {string} config.baseURL
   * @param {object} config.params
   * @param {Function} config.paramsSerializer
   */
  constructor({
    url, baseURL, params, paramsSerializer,
  }) {
    this.url = url
    this.baseURL = baseURL
    this.params = params
    this.paramsSerializer = paramsSerializer
  }

  /**
   * 是否绝对路径
   * @returns {boolean}
   */
  isAbsolute() {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(this.url)
  }

  get path() {
    const path = this.isAbsolute()
      ? this.url
      : `${this.baseURL.replace(/\/+$/, '')}/${this.url.replace(/^\/+/, '')}`
    return path.split('?')[0]
  }

  get queryString() {
    const queryParams = this.url.split('?').slice(1).join('?')
    return this.paramsSerializer({
      ...qs.parse(queryParams),
      ...this.params,
    })
  }

  toString() {
    return `${this.path}?${this.queryString}`
  }
}

/**
 * 请求实例类
 */
class RequestInstance {
  /**
   * @param {InstanceConfig} instanceConfig
   */
  constructor(instanceConfig) {
    // 在默认配置基础上合并实例配置
    this.config = { ...defaultConfig, ...instanceConfig }
    /**
     * 拦截器操作动作
     */
    this.interceptors = {
      request: new Interceptors(),
      response: new Interceptors(),
    }
  }

  /**
   * @param {RequestConfig} requestConfig
   */
  async request(requestConfig) {
    // 合并实例配置与请求配置
    /**
     * @type {RequestConfig}
     */
    let config = {
      ...this.config,
      ...requestConfig,
    }
    /* 处理拦截器 */
    config = this.interceptors.request.exec(config)
    /* 组装请求地址 */
    const url = new RequestUrl(config).toString()
    /* 解析请求体 */
    const body = config.transformRequest(config.body, config.headers)
    /* 发送请求 */
    return fetch(url, {
      ...config, body,
    })
      .then((response) => {
        if (!response.ok) {
          // 不成功的请求走reject流
          return Promise.reject(response)
        }
        return response
      })
      .then(config.transformResponse)
      .catch((error) => {
        if (error instanceof Response) {
          this.interceptors.response.exec(error)
        }
        return Promise.reject(error)
      })
  }
}

/**
 * 创建请求实例 同一实例会共享一些配置 通常一个实例对应一个后端服务
 * @param {InstanceConfig} instanceConfig
 * @returns {RequestInstance}
 */
function create(instanceConfig = {}) {
  return new RequestInstance(instanceConfig)
}

/**
 * 默认请求实例
 */
const instance = create()

/**
 * 后台管理系统实例
 */
const adminInstance = create({
  baseURL: import.meta.env.VITE_ADMIN_CONTEXT_PATH,
})
adminInstance.interceptors.request.use(tokenRequest)
adminInstance.interceptors.response.use(unauthorizedResponse)
adminInstance.interceptors.response.use(failedResponsePrompt)

export default { create, instance }
export { METHOD, instance, adminInstance }
