import { KJUR, KEYUTIL } from 'jsrsasign'
import {
  CommonQuery, Instance, Page, Response,
} from '@/typings';
import { User } from './user';

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

export const generateSecretKey = (client: Instance) =>
  async (groupId: string): Promise<string> => {
    const { prvKeyObj, pubKeyObj } = KEYUTIL.generateKeypair('RSA', 2048)
    const pemExported = KEYUTIL.getPEM(pubKeyObj)

    return client.request({
      url: `/user-group/${groupId}/secret-key`,
      method: 'PATCH',
      data: { publicKey: pemExported },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(({ data }) => data)
      .then((cipherText: string) => KJUR.crypto.Cipher.decrypt(cipherText, prvKeyObj, 'RSA'))
  }

export const groupMemberPage = (client: Instance) =>
  async (groupId: string, params: CommonQuery): Promise<Response<Page<User>>> =>
    client.request({
      url: `/user-group/${groupId}/member`,
      method: 'GET',
      params,
    })

export const joinGroup = (client: Instance) =>
  async (groupId: string, userId: string) =>
    client.request({
      url: `/user-group/${groupId}/member/${userId}`,
      method: 'POST',
    })

export const removeGroupMember = (client: Instance) =>
  async (groupId: string, userIds: string[]) =>
    client.request({
      url: `/user-group/${groupId}/member`,
      method: 'DELETE',
      data: userIds,
    })
