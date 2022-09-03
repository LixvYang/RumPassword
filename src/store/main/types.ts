import { Group, GroupContent, NewContent } from '@/utils/quorum-wasm/types'

export interface IMainState {
  nodeLoading: boolean
  group: Group
  groupContent: GroupContent[]
  groupId: string
  newGroupContent: NewContent[]
}
