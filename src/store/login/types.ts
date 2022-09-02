import { IGroupsInfo, INodeInfo } from '@/utils/quorum-wasm/types'

export interface ILoginState {
  nodeLoading: boolean
  nodeInfo: INodeInfo
  groupsInfo: IGroupsInfo
}
