export type LoginParamsType = {
  username: string
  password: string
  mobile: string
  captcha: string
  type: string
}

export async function accountLogin(params: Partial<LoginParamsType>) {
  // const resp = await httpPost("/admin/login", params)
  return {} as any
}

export async function accountGetCaptcha(mobile: string) {
  return {}
}

export async function accountLogout() {
}
