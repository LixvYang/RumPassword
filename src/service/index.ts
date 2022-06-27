import RUMRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const rumrequest = new RUMRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败')
      return err
    },
    responseInterceptor: (config) => {
      console.log('响应拦截')

      return config
    },
    responseInterceptorCatch(err) {
      console.log('响应失败')
      return err
    }
  }
})

export default rumrequest
