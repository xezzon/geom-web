import { Instance, Response } from '@/typings';

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
  async (user: User) =>
    client.request({
      url: '/register',
      method: 'POST',
      data: user,
    })

export const getMe = (client: Instance) =>
  async (): Promise<Response<User>> =>
    client.request({
      url: '/me',
      method: 'GET',
    })

export const login = (client: Instance) =>
  async (user: User) =>
    client.request({
      url: '/login',
      method: 'POST',
      data: user,
    })

export const logout = (client: Instance) =>
  async () =>
    client.request({
      url: '/logout',
      method: 'POST',
    })
