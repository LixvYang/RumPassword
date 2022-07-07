/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.js'
declare module '*.wasm'
declare let $store: any

declare const StartQuorum: (...p: Array<any>) => Promise<any>
declare const StopQuorum: (...p: Array<any>) => Promise<any>
declare const StartSync: (...p: Array<any>) => Promise<any>
declare const Announce: (...p: Array<any>) => Promise<any>
declare const GetGroupProducers: (...p: Array<any>) => Promise<any>
declare const GetGroupSeed: (...p: Array<any>) => Promise<any>
declare const GetAnnouncedGroupProducers: (...p: Array<any>) => Promise<any>
declare const GroupProducer: (...p: Array<any>) => Promise<any>
declare const CreateGroup: (...p: Array<any>) => Promise<any>
declare const MgrAppConfig: (...p: Array<any>) => Promise<any>
declare const MgrChainConfig: (...p: Array<any>) => Promise<any>
declare const GetChainTrxAllowList: (...p: Array<any>) => Promise<any>
declare const GetChainTrxDenyList: (...p: Array<any>) => Promise<any>
declare const GetChainTrxAuthMode: (...p: Array<any>) => Promise<any>
declare const GetAppConfigKeyList: (...p: Array<any>) => Promise<any>
declare const GetAppConfigItem: (...p: Array<any>) => Promise<any>
declare const UpdateProfile: (...p: Array<any>) => Promise<any>
declare const GetTrx: (...p: Array<any>) => Promise<any>
declare const PostToGroup: (...p: Array<any>) => Promise<any>
declare const GetNodeInfo: (...p: Array<any>) => Promise<any>
declare const GetNetwork: (...p: Array<any>) => Promise<any>
declare const GetContent: (...p: Array<any>) => Promise<any>
declare const JoinGroup: (...p: Array<any>) => Promise<any>
declare const LeaveGroup: (...p: Array<any>) => Promise<any>
declare const ClearGroupData: (...p: Array<any>) => Promise<any>
declare const GetGroups: (...p: Array<any>) => Promise<any>
declare const GetKeystoreBackupReadableStream: (
  ...p: Array<any>
) => Promise<any>
declare const KeystoreBackupRaw: (...p: Array<any>) => Promise<any>
declare const KeystoreRestoreRaw: (...p: Array<any>) => Promise<any>
declare const IsQuorumRunning: (...p: Array<any>) => Promise<any>
