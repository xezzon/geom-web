import {
  CommonQuery, Instance, Page, Response,
} from '@/typings';

export enum OpenapiType {
  RPC,
  WEBHOOK,
}

export interface Openapi {
  id: string,
  code: string,
  name: string,
  type: OpenapiType,
}

export const openapiPage = (client: Instance) =>
  async (params: CommonQuery): Promise<Response<Page<Openapi>>> =>
    client.request({
      url: '/openapi',
      method: 'GET',
      params,
    })

export const addOpenapi = (client: Instance) =>
  async (openapi: Omit<Openapi, 'id'>) =>
    client.request({
      url: '/openapi',
      method: 'POST',
      data: openapi,
    })
