import { Instance, Response } from '@/typings';

export interface Menu {
  id: string;
  /**
   * 菜单路径
   */
  path: string;
  /**
   * 菜单名称
   */
  name: string;
  /**
   * 组件路径
   */
  component?: string,
  /**
   * 图标标识
   */
  icon?: string,
  /**
   * 排序
   */
  ordinal: number,
  /**
   * 是否隐藏
   */
  hideInMenu: boolean,
  /**
   * 上级菜单主键
   */
  parentId: string,
  /**
   * 子级菜单
   */
  children: Menu[],
}

export function menuTree(client: Instance) {
  return async (): Promise<Response<Menu[]>> =>
    client.request({
      url: '/menu',
      method: 'GET',
    })
}

export function addMenu(client: Instance) {
  return async (menu: Partial<Menu>) =>
    client.request({
      url: '/menu',
      method: 'POST',
      data: menu,
    })
}

export function modifyMenu(client: Instance) {
  return async (menu: Partial<Menu>) =>
    client.request({
      url: '/menu',
      method: 'PUT',
      data: menu,
    })
}

export function deleteMenu(client: Instance) {
  return async (id: string) =>
    client.request({
      url: `/menu/${id}`,
      method: 'DELETE',
    })
}
