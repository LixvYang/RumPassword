import { Go } from './wasm_exec'
import quorumWasmUrl from './lib.wasm'
import { ICreateGroupParams, ICreateGroupResult, IGroupsInfo, INodeInfo } from './types';

const init = async () => {
  const go = new Go();
  const r = await WebAssembly.instantiateStreaming(fetch(quorumWasmUrl), go.importObject);
  go.run(r.instance);
}

init();

export const startQuorum = async (bootstraps: Array<string>) => {
  await StartQuorum('password', bootstraps.join(','))
}

export const getNodeInfo = async () => {
  return await GetNodeInfo().then((res: INodeInfo) => {
    return res
  })
}

export const getGroups = async () => {
  return await GetGroups().then((res) => {
    console.log(res)
    return res
  })
}

export const createGroup = async (groupInfo: any) => {
  console.log('正在建立群组')
  return await CreateGroup(groupInfo)
}

export const isQuorumRunning = async () => {
  return await IsQuorumRunning().then((res) => {
    return res
  })
}
