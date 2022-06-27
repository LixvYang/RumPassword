import axios, { AxiosInstance } from 'axios'
import { ElLoading, timelineItemProps } from 'element-plus'
import { RUMRequestConfig, RUMRequestInterceptors } from './types'

class RUMRequest {
  instance: AxiosInstance
  interceptors?: RUMRequestInterceptors
  loading?: any

  constructor(config: RUMRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.request.use(
      (config) => {
        this.loading = ElLoading.service({
          lock: true,
          text: '正在请求数据...',
          background: 'rgba(0, 0, 0, 0.5)'
        })
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404错误~')
        }
        return err
      }
    )
  }

  request(config: RUMRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default RUMRequest
