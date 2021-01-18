// @ts-ignore
export type LoginParamsType = {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return {
    status: "ok"
  }
}

export async function getFakeCaptcha(mobile: string) {
  return {}
}

export async function outLogin() {
}
