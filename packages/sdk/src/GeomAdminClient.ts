import axios, { AxiosInstance, CreateAxiosDefaults } from "axios"
import { register } from "@/api/user";

export declare type Instance = AxiosInstance

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
