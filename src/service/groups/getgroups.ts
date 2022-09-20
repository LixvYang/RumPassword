import { IGroupsInfo } from '@/utils/quorum-wasm/types'
import rumrequest from '..'

enum GroupAPI {
  GetGroups = '/groups'
}

// export function getGroups() {
//   return rumrequest.get<IGroupsInfo>({
//     url: GroupAPI.GetGroups
//   })
// }

export function getGroups() {
  return GetGroups()
}
