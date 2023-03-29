import axios, { CreateAxiosDefaults } from "axios"
import { Instance } from "@/typings";
import { getMe, login, logout, register } from "@/api/user";

export default (config: CreateAxiosDefaults) => {
  const instance: Instance = axios.create(config)

  return {
    instance: instance,
    /**
     * 用户注册
     */
    register: register(instance),
    /**
     * 用户登录
     */
    login: login(instance),
    /**
     * 获取当前登录用户信息
     */
    getMe: getMe(instance),
    /**
     * 退出登录
     */
    logout: logout(instance),
  }
}
