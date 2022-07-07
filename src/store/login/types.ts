import { IGroupsInfo, INodeInfo } from '@/utils/quorum-wasm/types'

export interface ILoginState {
  nodeInfo: INodeInfo
  groupsInfo: IGroupsInfo
}
