import { API_URL } from '@/consts'
import { httpGet } from '@/api/client'

export async function fetchInitialData() {
  return await httpGet(`${API_URL}/initial/data`)
}

export type LoginParamsType = {
  username: string
  password: string
  mobile: string
  captcha: string
  type: string
}

export async function accountLogin(params: LoginParamsType) {
  return {
    status: 'ok',
  } as any
}

export async function accountGetCaptcha(mobile: string) {
  return {}
}

export async function accountLogout() {}
