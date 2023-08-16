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

export interface OpenapiInstance {
  id: string,
  apiId: string,
  apiName: string,
  callback: string,
  owner: string,
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

export const openapiInstancePage = (client: Instance) =>
  async (params: CommonQuery): Promise<Response<Page<OpenapiInstance>>> =>
    client.request({
      url: '/openapi/instance',
      method: 'GET',
      params,
    })
