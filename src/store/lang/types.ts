import cache from '@/utils/cache/cache'

export type State = {
  language: string
}

// export const ILangState = {
//   language: cache.getCache('localeLang') || 'zhCn'
// }

export interface ILangState {
  language: string
}
