import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RUMRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}

export interface RUMRequestConfig extends AxiosRequestConfig {
  interceptors?: RUMRequestInterceptors
}
