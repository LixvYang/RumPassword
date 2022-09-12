import { Content, GroupContent } from '@/utils/quorum-wasm/types'
import rumrequest from '..'
import { getGroupContent as getContent } from '@/utils/quorum-wasm/load-quorum'

export function getGroupContent(group_id: string | undefined) {
  return rumrequest.post<GroupContent<Content>[]>({
    baseURL: 'http://127.0.0.1:8002/app/api/v1/',
    url: `/group/${group_id}/content?num=20`,
    showLoading: false
  })
}

// export function getGroupContent(group_id: string) {
//   return getContent(
//     JSON.stringify({
//       groupId: group_id,
//       num: 20,
//       startTrx: 0,
//       nonce: 0,
//       reverse: false,
//       includestarttrx: true
//     })
//   )
// }
