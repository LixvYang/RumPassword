import { INodeInfo } from '@/utils/quorum-wasm/types'
import rumrequest from '..'

enum NodeAPI {
  GetNodeInfo = '/node'
}

export function getNodeInfo() {
  return rumrequest.get<INodeInfo>({
    url: NodeAPI.GetNodeInfo,
    showLoading: false
  })
}
