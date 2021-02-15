import { httpGet, httpPost } from '@/api/client'

export async function fetchInitialData() {
  const resp = await httpGet(`/admin/initial`)
  return resp.data as any
}

export type LoginParamsType = {
  username: string
  password: string
  mobile: string
  captcha: string
  type: string
}

export async function accountLogin(params: LoginParamsType) {
  const resp = await httpPost('/admin/login', params)
  return resp.data as any
}

export async function accountGetCaptcha(mobile: string) {
  return {}
}

export async function accountLogout() {
}
