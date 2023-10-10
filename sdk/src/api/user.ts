import { Instance, PResponse, Response } from '@/typings';

/**
 * 用户
 */
export interface User {
  id: string,
  /**
   * 用户名
   */
  username: string,
  /**
   * 密码
   */
  plaintext: string,
  /**
   * 用户昵称
   */
  nickname: string,
}

/**
 * 令牌
 */
export interface Token {
  tokenName: string,
  tokenValue: string,
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
  async (user: User): PResponse<Token> =>
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

export const searchUser = (client: Instance) =>
  async (searchValue: string): Promise<Response<User[]>> =>
    client.request({
      url: '/user/search',
      method: 'GET',
      params: { searchValue },
    })
