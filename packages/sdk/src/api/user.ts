import { Instance } from "@/GeomAdminClient";

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
