import axios, { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'
import { RUMRequestConfig, RUMRequestInterceptors } from './types'

const DEFAULT_LOADING = true

class RUMRequest {
  instance: AxiosInstance
  interceptors?: RUMRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: RUMRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
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
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.loading?.close()
        }, 1000);
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

  request<T>(config: RUMRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 单个请求对请求config的处理
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    // 2. 判断是否显示loading
    if (config.showLoading === false) {
      this.showLoading = config.showLoading
    }

    this.instance.request<any, T>(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        // res = config.interceptors.responseInterceptor(res)
      }
      this.showLoading = DEFAULT_LOADING
      // 3. 将结果返回出去
      resolve(res)
    }).catch((err) => {
      this.showLoading = DEFAULT_LOADING
      reject(err)
      return err
    })
    })
  }

  get<T>(config: RUMRequestConfig): Promise<T> {
    return this.request<T>({...config, method : 'GET'})
  }
  post<T>(config: RUMRequestConfig): Promise<T> {
    return this.request<T>({...config, method : 'POST'})
  }
  delete<T>(config: RUMRequestConfig): Promise<T> {
    return this.request<T>({...config, method : 'DELETE'})
  }
  patch<T>(config: RUMRequestConfig): Promise<T> {
    return this.request<T>({...config, method : 'PATCH'})
  }
}

export default RUMRequest
