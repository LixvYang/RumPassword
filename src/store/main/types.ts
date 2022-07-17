import { Group, GroupContent } from '@/utils/quorum-wasm/types'

export interface IMainState {
  group: Group
  groupContent: GroupContent[]
}
