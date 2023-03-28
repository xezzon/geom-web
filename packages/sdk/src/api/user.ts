import { Instance } from "@/GeomAdminClient";
import { AxiosResponse } from "axios";

/**
 * 用户
 */
export interface User {
  /**
   * 用户名
   */
  username: string,
  /**
   * 密码
   */
  plaintext: string,
}

export const register = (client: Instance) =>
  async (user: Partial<User>) =>
    client.request({
      url: '/register',
      method: 'POST',
      data: user,
    })

export const getMe = (client: Instance) =>
  async (): Promise<AxiosResponse<User, void>> =>
    client.request({
      url: '/me',
      method: 'GET',
    })

export const login = (client: Instance) =>
  async (user: Partial<User>) =>
    client.request({
      url: '/login',
      method: 'POST',
      data: user,
    })
