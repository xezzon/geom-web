import qs from 'qs'

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
 * @property {RequestHeaders} headers 请求头
 * @property {object} params URL参数
 * @property {(params: object) => string} paramsSerializer params序列化方法
 * @property {(data: any, headers: RequestHeaders) => any} transformRequest 拦截并修改请求体/请求头
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
 * 新增拦截器
 * @param {Array<Function>} interceptors 拦截器组
 * @param {Function} interceptor 拦截器
 * @returns 拦截器对象
 */
function pushInterceptor(interceptors, interceptor) {
  const existed = interceptors.find((item) => item === interceptor)
  if (existed) {
    return existed
  }
  interceptors.push(interceptor)
  return interceptor
}

/**
 * 移除拦截器
 * @param {Array<Function>} interceptors 拦截器组
 * @param {object} interceptor 拦截对象
 */
function removeInterceptor(interceptors, interceptor) {
  const index = interceptors.findIndex((item) => item === interceptor)
  interceptors.splice(index, 1)
}

/**
 * 请求实例类
 */
class RequestInstance {
  constructor(instanceConfig) {
    // 在默认配置基础上合并实例配置
    /**
     * @type {InstanceConfig}
     */
    this.config = { ...defaultConfig, ...instanceConfig }
    /**
     * 请求拦截器组
     * @private
     */
    this.requestInterceptors = []
    /**
     * 响应拦截器组
     * @private
     */
    this.responseInterceptors = []
    /**
     * 拦截器操作动作
     * @public
     */
    this.interceptors = {
      request: {
        /**
         * @param {Function} interceptor
         */
        use: (interceptor) => pushInterceptor(this.requestInterceptors, interceptor),
        eject: (interceptor) => removeInterceptor(this.requestInterceptors, interceptor),
      },
      response: {
        /**
         * @param {Function} interceptor
         */
        use: (interceptor) => pushInterceptor(this.responseInterceptors, interceptor),
        eject: (interceptor) => removeInterceptor(this.responseInterceptors, interceptor),
      },
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
    config = this.requestInterceptors.reduce((pre, curr) => curr(pre), config)
    /* 解析查询参数 */
    let searchParams = ''
    if (config.params) {
      searchParams += config.url.includes('?') ? '&' : '?'
      searchParams += config.paramsSerializer(config.params)
    }
    /* 组装请求地址 */
    const url = `${config.baseURL}${config.url}${searchParams}`
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
          this.responseInterceptors.reduce((pre, curr) => curr(pre), error)
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

export { METHOD, create, instance }
