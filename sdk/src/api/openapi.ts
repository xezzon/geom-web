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
