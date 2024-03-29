export interface INodeInfo {
  node_id?: string
  node_publickey?: string
  node_status?: string
  node_type?: string
  node_version?: string
  peers?: any
}

export interface ICreateGroupParams {
  group_name: string
  consensus_type: string
  encryption_type: string
  app_key: string
}

export interface ICreateGroupResult {
  genesis_block: GenesisBlock
  group_id: string
  group_name: string
  owner_pubkey: string
  consensus_type: string
  encryption_type: string
  cipher_key: string
  app_key: string
  signature: string
}

export interface GenesisBlock {
  BlockId: string
  GroupId: string
  ProducerPubKey: string
  Hash: string
  Signature: string
  TimeStamp: string
}

export interface IGroupsInfo {
  groups?: Group[]
}

export interface Group {
  group_id?: string
  group_name?: string
  owner_pubkey?: string
  user_pubkey?: string
  user_eth_addr?: string
  consensus_type?: string
  encryption_type?: string
  cipher_key?: string
  app_key?: string
  last_updated?: number
  highest_height?: number
  highest_block_id?: string
  group_status?: string
  snapshot_info?: null
}

export interface GroupContentData<T = any> {
  data: GroupContent<T>[]
}

export interface GroupContent<T = any> {
  TrxId?: string
  Publisher?: string
  Content?: T
  TypeUrl?: string
  TimeStamp?: number
}

export interface Content {
  id?: string
  type?: string
  content?: string
  name?: string
}

export interface NewContent {
  content?: string
  name?: string
}

export interface CreateGroupParams {
  group_name?: string
  consensus_type?: string
  encryption_type?: string
  app_key?: string
}

export interface ClearGroupParams {
  group_id?: string
}

export interface DeleteGroupParams {
  group_id?: string
}

export interface PostContentToGroupParams {
  type?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  object?: Object
  target?: Target
}

export interface Object {
  id?: string
  type?: string
  content?: string
  name?: string
}

export interface Target {
  id?: string
  type?: string
}

export interface INetworkInfo {
  peer_id?: string
  eth_addr?: string
  nat_type?: string
  nat_enabled?: boolean
  addrs?: string[]
  groups?: Group[]
  node?: Node
}

export interface Group {
  GroupId?: string
  GroupName?: string
  Peers?: null
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Node {}
