import { PostContentToGroupParams } from '@/utils/quorum-wasm/types'
import rumrequest from '..'

enum ContentAPI {
  DelContent = '/group/content'
}

export function delGroupContent(
  trx_id: string | undefined,
  group_id: string | undefined,
  name: string | undefined
) {
  return rumrequest.post({
    url: ContentAPI.DelContent,
    data: {
      type: 'Add',
      object: {
        id: trx_id,
        type: 'Note',
        content: 'DELETED_CONTENT',
        name: name
      },
      target: {
        id: group_id,
        type: 'Group'
      }
    }
  })
}
