import { GeomAdminClient } from '@xezzon/geom';
import { failedResponsePrompt } from './interceptor';

export const adminClient = GeomAdminClient({
  baseURL: import.meta.env.GEOM_ADMIN_API,
})
adminClient.instance.interceptors.response.use(undefined, failedResponsePrompt)
