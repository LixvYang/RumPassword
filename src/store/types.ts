import { ILangState } from './lang/types'
import { ILoginState } from './login/types'
import { IMainState } from './main/types'

export interface IRootState {}

export interface IRootWithModule {
  login: ILoginState
  lang: ILangState
  main: IMainState
}

export type IStoreType = IRootState & IRootWithModule
