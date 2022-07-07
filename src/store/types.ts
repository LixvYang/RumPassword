import { ILoginState } from './login/types'

export interface IRootState {}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
