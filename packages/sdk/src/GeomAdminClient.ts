import axios, { AxiosInstance, CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios"
import { register } from "@/api/user";

/* 统一定义为抽象类型 暂时使用 Axios 实现 */
export declare type Instance = AxiosInstance
export declare type Interceptor = (config: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any>

export default (config: CreateAxiosDefaults) => {
  const instance: Instance = axios.create(config)

  return {
    instance: instance,
    /**
     * 用户注册
     */
    register: register(instance)
  }
}
