import { IGroupsInfo, CreateGroupParams } from '@/utils/quorum-wasm/types'
import rumrequest from '..'

enum GroupAPI {
  GetGroups = '/groups',
  CreateGroup = '/group'
}

export function getGroups() {
  return rumrequest.get<IGroupsInfo>({
    url: GroupAPI.GetGroups
  })
}

export function createGroup(groupName: string) {
  console.log('请求到了createGroup')
  return rumrequest.post<CreateGroupParams>({
    url: GroupAPI.CreateGroup,
    data: {
      group_name: groupName,
      consensus_type: 'poa',
      encryption_type: 'public',
      app_key: '123456'
    }
  })
}
