import { CommonQuery, Instance, Page, Response } from "@/typings";

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