import { PostContentToGroupParams } from '@/utils/quorum-wasm/types'
import rumrequest from '..'

enum ContentAPI {
  PostContent = '/group/content'
}

export function postGroupContent(
  group_id: string | undefined,
  content: string | undefined,
  name: string | undefined
) {
  return rumrequest.post<PostContentToGroupParams>({
    url: ContentAPI.PostContent,
    data: {
      type: 'Add',
      object: {
        type: 'Note',
        content: content,
        name: name
      },
      target: {
        id: group_id,
        type: 'Group'
      }
    }
  })
}
