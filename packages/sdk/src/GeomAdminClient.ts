import axios, { AxiosInstance, CreateAxiosDefaults } from "axios"

export declare type Instance = AxiosInstance

export default (config: CreateAxiosDefaults) => {
  const instance: Instance = axios.create(config)

  return {
    instance: instance,
  }
}
