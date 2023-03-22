export { default as GeomAdminClient } from "./GeomAdminClient"

export interface Result<T> {
  code: string,
  message?: string,
  data?: T,
  requestId?: string,
}
