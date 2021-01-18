// @ts-ignore
export type LoginParamsType = {
  username: string
  password: string
  mobile: string
  captcha: string
  type: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fakeAccountLogin(params: LoginParamsType) {
  return {
    status: 'ok',
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getFakeCaptcha(mobile: string) {
  return {}
}

export async function outLogin() {}
