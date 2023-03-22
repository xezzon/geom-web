import { GeomAdminClient } from "@xezzon/geom";

export const adminClient = GeomAdminClient({
  baseURL: import.meta.env.GEOM_ADMIN_URL,
})