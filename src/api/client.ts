import axios from 'axios'
import { API_URL, ACCESS_TOKEN } from '@/consts'
import { message } from 'antd'

axios.defaults.timeout = 20000

const httpClient = axios.create()

httpClient.interceptors.request.use(
  (config) => {
    config.baseURL = API_URL
    const AK = localStorage.getItem(ACCESS_TOKEN)
    if (AK) {
      config.headers.Authorization = `Bearer ${AK}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          if (typeof error.response.data.message === 'string') {
            message.error(error.response.data.message)
          }
          break
        case 404:
          message.error(error.response.data.message)
          break
        case 500:
          message.error('服务器出了小毛病哦')
          break
      }
    }
    return Promise.reject(error.response)
  }
)

export function httpGet(url: string, params = {}) {
  return new Promise((resolve) => {
    httpClient
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        if (err && err.status) {
          console.log(`请求${url}错误,${err.status}`)
          if (err.status === 401 || err.status === 403) {
            localStorage.removeItem(ACCESS_TOKEN)
          }
        }
      })
  })
}

export function httpPost(url: string, data = {}, strict = true) {
  return new Promise((resolve, reject) => {
    httpClient.post(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

export async function fetchInitialData(): Promise<any> {
  return httpGet(`${API_URL}/initial/data`)
}
