import { httpGet, httpPost } from '@/graphql/client'
import { mockProfile } from '@/mock/user'

export async function fetchInitialData() {
  // const resp = await httpGet(`/admin/initial`)
  return mockProfile
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

export async function accountLogout() {}
