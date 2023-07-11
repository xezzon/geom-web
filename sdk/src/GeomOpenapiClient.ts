import axios from 'axios'
import { InstanceConfig } from '@/typings';
import { addOpenapi, openapiPage } from './api/openapi';

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
  }
}
