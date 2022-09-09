import { postToGroup } from '@/utils/quorum-wasm/load-quorum'
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

// export function postGroupContent(
//   group_id: string | undefined,
//   content: string | undefined,
//   name: string | undefined
// ) {
//   return postToGroup(
//     JSON.stringify({
//       type: 'Add',
//       object: {
//         type: 'Note',
//         content: content,
//         name: name
//       },
//       target: {
//         id: group_id,
//         type: 'Group'
//       }
//     })
//   )
// }

export function changeGroupContent(
  trx_id: string | undefined,
  group_id: string | undefined,
  content: string | undefined,
  name: string | undefined
) {
  console.log('trx_id =' + trx_id)
  return rumrequest.post({
    url: ContentAPI.PostContent,
    data: {
      type: 'Add',
      object: {
        id: trx_id,
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

// export function changeGroupContent(
//   trx_id: string | undefined,
//   group_id: string | undefined,
//   content: string | undefined,
//   name: string | undefined
// ) {
//   console.log('trx_id =' + trx_id)
//   return postToGroup(
//     JSON.stringify({
//       type: 'Add',
//       object: {
//         id: trx_id,
//         type: 'Note',
//         content: content,
//         name: name
//       },
//       target: {
//         id: group_id,
//         type: 'Group'
//       }
//     })
//   )
// }
