import { ILangState } from './lang/types'
import { ILoginState } from './login/types'

export interface IRootState {}

export interface IRootWithModule {
  login: ILoginState
  lang: ILangState
}

export type IStoreType = IRootState & IRootWithModule
