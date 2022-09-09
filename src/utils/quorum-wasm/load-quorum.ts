import { Go } from './wasm_exec'
import quorumWasmUrl from './lib.wasm'

const init = async () => {
  const go = new Go()
  const r = await WebAssembly.instantiateStreaming(
    fetch(quorumWasmUrl),
    go.importObject
  )
  go.run(r.instance)
}

init()

export const startQuorum = async (bootstraps: Array<string>) => {
  await StartQuorum('password', bootstraps.join(','))
}

export async function getNodeInfo(): Promise<any> {
  const res: Promise<any> = GetNodeInfo()
  return res
}

// export async function getGroups(): Promise<any> {
//   const res: Promise<any> = GetGroups()
//   return res
// }

export async function getGroupContent(p: any): Promise<any> {
  return await GetContent(p)
}

export async function postToGroup(p: any): Promise<any> {
  return await PostToGroup(p)
}

export const createGroup = async (groupInfo: any) => {
  return await CreateGroup(groupInfo)
}

export const isQuorumRunning = async () => {
  return await IsQuorumRunning().then((res) => {
    return res
  })
}
