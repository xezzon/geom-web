import { GeomAdminClient, GeomOpenapiClient } from '@xezzon/geom';
import { failedResponsePrompt } from '@geom/util/interceptor';

export const adminClient = GeomAdminClient({
  baseURL: import.meta.env.GEOM_ADMIN_API,
})
adminClient.instance.interceptors.response.use(undefined, failedResponsePrompt)

export const openapiClient = GeomOpenapiClient({
  baseURL: import.meta.env.GEOM_OPENAPI_API,
})
openapiClient.instance.interceptors.response.use(undefined, failedResponsePrompt)
