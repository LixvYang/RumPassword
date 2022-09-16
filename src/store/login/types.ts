import { IGroupsInfo, INetworkInfo, INodeInfo } from '@/utils/quorum-wasm/types'

export interface ILoginState {
  nodeLoading: boolean
  networkInfo: INetworkInfo
  nodeInfo: INodeInfo
  groupsInfo: IGroupsInfo
}
