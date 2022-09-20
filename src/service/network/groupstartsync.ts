import { INodeInfo } from '@/utils/quorum-wasm/types'
import rumrequest from '..'

// export default function groupStartSync(group_id: string) {
//   return rumrequest.get<INodeInfo>({
//     baseURL: `http://localhost:8002/api/v1/group/${group_id}/startsync`,
//     showLoading: false
//   })
// }
export default function groupStartSync(group_id: string) {
  return StartSync(group_id)
}
