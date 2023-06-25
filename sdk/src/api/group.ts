import { Instance, Response } from '@/typings';

export interface Group {
  id: string,
  /**
   * 用户组编码
   */
  code: string,
  /**
   * 用户组名称
   */
  name: string,
  /**
   * 用户组类型
   */
  type: string,
  /**
   * 所属用户ID
   */
  ownerId: string,
}

export const getMyGroups = (client: Instance) =>
  async (): Promise<Response<Array<Group>>> =>
    client.request({
      url: '/user-group',
      method: 'GET',
    })
