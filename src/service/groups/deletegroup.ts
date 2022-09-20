import { DeleteGroupParams, ClearGroupParams } from '@/utils/quorum-wasm/types'
import rumrequest from '..'

// enum GroupAPI {
//   ClearGroup = '/group/clear',
//   LeaveGroup = '/group/leave'
// }

// export function clearGroup(group_id: string | undefined) {
//   return rumrequest.post<ClearGroupParams>({
//     url: GroupAPI.ClearGroup,
//     data: {
//       group_name: group_id
//     }
//   })
// }

// export function leaveGroup(group_id: string | undefined) {
//   return rumrequest.post<DeleteGroupParams>({
//     url: GroupAPI.LeaveGroup,
//     data: {
//       group_id: group_id
//     }
//   })
// }

export function clearGroup(group_id: string | undefined) {
  console.log('clearGroup')
  return ClearGroupData(group_id)
}
export function leaveGroup(group_id: string | undefined) {
  console.log('leaveGroup')
  return LeaveGroup(group_id)
}
