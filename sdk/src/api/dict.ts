/* eslint-disable implicit-arrow-linebreak */
import {
  CommonQuery, Instance, Page, Response,
} from '@/typings';

export interface Dict {
  id: string;
  /**
   * 字典目
   */
  tag: string;
  /**
   * 字典值
   */
  code: string;
  /**
   * 字典描述
   */
  label?: string;
  /**
   * 排序号
   */
  ordinal: number;
  /**
   * 上级字典ID
   */
  parentId: string;
  /**
   * 子级字典
   */
  children: Dict[];
}

export const dictTagPage = (client: Instance) =>
  async (params: CommonQuery): Promise<Response<Page<Dict>>> =>
    client.request({
      url: '/dict/tag',
      method: 'GET',
      params,
    })

export const addDict = (client: Instance) =>
  async (dict: Dict) =>
    client.request({
      url: '/dict',
      method: 'POST',
      data: dict,
    })

export const dictListByTag = (client: Instance) =>
  async (tag: string): Promise<Response<Dict[]>> =>
    client.request({
      url: '/dict',
      method: 'GET',
      params: { tag },
    })

export const removeDict = (client: Instance) =>
  async (id: string) =>
    client.request({
      url: `/dict/${id}`,
      method: 'DELETE',
    })

export const modifyDict = (client: Instance) =>
  async (dict: Dict) =>
    client.request({
      url: '/dict',
      method: 'PUT',
      data: dict,
    })

export const dictByTagAndCode = (client: Instance) =>
  async (tag: string, code: string): Promise<Response<Dict>> =>
    client.request({
      url: `/dict/${tag}/${code}`,
      method: 'GET',
    })
