import RUMRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const rumrequest = new RUMRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = ''
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (config) => {
      return config
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})

export default rumrequest
