import { GroupContent, NewContent } from '@/utils/quorum-wasm/types'

export interface IMainState {
  nodeLoading: boolean
  groupContent: GroupContent[]
  groupId: string
  newGroupContent: NewContent[]
  groupName: string
}
