import axios from 'axios'
import { InstanceConfig } from '@/typings';
import { addOpenapi, openapiInstancePage, openapiPage } from './api/openapi';

export default (config: InstanceConfig) => {
  const instance = axios.create(config)

  return {
    instance,
    /**
     * 对外接口列表
     */
    openapiPage: openapiPage(instance),
    /**
     * 新增对外接口
     */
    addOpenapi: addOpenapi(instance),
    /**
     * 查询订阅的接口列表
     */
    openapiInstancePage: openapiInstancePage(instance),
  }
}
