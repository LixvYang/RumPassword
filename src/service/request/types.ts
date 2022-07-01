import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RUMRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface RUMRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: RUMRequestInterceptors<T>
  showLoading?: boolean
}
