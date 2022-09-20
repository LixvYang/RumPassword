import { IGroupsInfo, CreateGroupParams } from '@/utils/quorum-wasm/types'
import rumrequest from '..'
import { createGroup as CreateGroup } from '@/utils/quorum-wasm/load-quorum'

enum GroupAPI {
  CreateGroup = '/group'
}

// export function createGroup(groupName: string) {
//   return rumrequest.post<CreateGroupParams>({
//     url: GroupAPI.CreateGroup,
//     data: {
//       group_name: groupName,
//       consensus_type: 'poa',
//       encryption_type: 'public',
//       app_key: '123456'
//     }
//   })
// }

export function createGroup(groupName: string): Promise<any> {
  return CreateGroup(
    JSON.stringify({
      group_name: groupName,
      consensus_type: 'poa',
      encryption_type: 'public',
      app_key: '123456'
    })
  )
}
