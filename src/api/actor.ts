import { httpGet, httpPost } from '@/api/client'

export async function fetchRedisInfo() {
  const resp = await httpGet(`/admin/actuator/redis/info`)
  return resp.data as any
}
