import { INetworkInfo } from '@/utils/quorum-wasm/types'
import rumrequest from '..'

enum NetworkAPI {
  GetNetworkInfo = '/network'
}

export default function getNodeInfo() {
  return rumrequest.get<INetworkInfo>({
    url: NetworkAPI.GetNetworkInfo,
    showLoading: false
  })
}
